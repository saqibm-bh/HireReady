from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from uuid import UUID
from datetime import datetime

from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.job import JobCreate, JobResponse
from app.services.job_service import create_new_job_posting, get_recruiter_jobs, get_all_job_postings
from app.services.gap_analysis_service import get_all_roles, get_all_skills
from app.database.supabase import supabase

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

@router.get("/meta")
def get_jobs_metadata():
    """Returns available job titles and skills for dropdowns."""
    return {
        "roles": get_all_roles(),
        "skills": get_all_skills()
    }

@router.get("/", response_model=List[JobResponse])
def get_all_jobs(
    db: Session = Depends(get_db)
):
    """Returns all job postings."""
    results = get_all_job_postings(db)
    return [
        JobResponse(
            id=r[0],
            recruiter_id=r[1],
            title=r[2],
            description=r[3],
            required_skills=r[4],
            experience_level=r[5],
            work_location=r[6],
            employment_type=r[7],
            created_at=r[8]
        ) for r in results
    ]

@router.post("/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(
    request: JobCreate,
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.get("role") != "recruiter":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only recruiters can post jobs"
        )

    try:
        new_job = create_new_job_posting(db, current_user["id"], request)
        
        return JobResponse(
            id=new_job[0],
            recruiter_id=new_job[1],
            title=new_job[2],
            description=new_job[3],
            required_skills=new_job[4],
            experience_level=new_job[5],
            work_location=new_job[6],
            employment_type=new_job[7],
            created_at=new_job[8]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create job posting: {str(e)}"
        )

@router.get("/my-postings", response_model=List[JobResponse])
def get_my_job_postings(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.get("role") != "recruiter":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only recruiters can view their postings here"
        )

    results = get_recruiter_jobs(db, current_user["id"])
    
    return [
        JobResponse(
            id=r[0],
            recruiter_id=r[1],
            title=r[2],
            description=r[3],
            required_skills=r[4],
            experience_level=r[5],
            work_location=r[6],
            employment_type=r[7],
            created_at=r[8]
        ) for r in results
    ]

@router.post("/{job_id}/apply")
async def apply_to_job(
    job_id: UUID,
    file: UploadFile = File(...),
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported"
        )

    try:
        # 1. Upload to Supabase Storage
        file_content = await file.read()
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{job_id}_{current_user['id']}_{int(datetime.now().timestamp())}.{file_extension}"
        
        # Upload using the dedicated client
        supabase.storage.from_("resumes").upload(
            path=unique_filename,
            file=file_content,
            file_options={"content-type": "application/pdf"}
        )
        
        # Get public URL
        resume_url = supabase.storage.from_("resumes").get_public_url(unique_filename)

        # 2. Save to database using existing SQLAlchemy session
        db.execute(
            text("""
                INSERT INTO job_applications (job_id, seeker_id, resume_url)
                VALUES (:job_id, :seeker_id, :resume_url)
            """),
            {
                "job_id": job_id,
                "seeker_id": current_user["id"],
                "resume_url": resume_url
            }
        )
        db.commit()

        return {"message": "Application submitted successfully", "resume_url": resume_url}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit application: {str(e)}"
        )
