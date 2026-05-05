from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from uuid import UUID
from datetime import datetime
import json

from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.job import JobCreate, JobResponse, ApplicationResponse
from app.services.job_service import create_new_job_posting, get_recruiter_jobs, get_all_job_postings
from app.services.gap_analysis_service import get_all_roles, get_all_skills, calculate_job_match
from app.database.supabase import supabase
from app.services.parsing_service import parse_resume

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

@router.get("/applied", response_model=List[ApplicationResponse])
def get_applied_jobs(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Returns jobs the current user has applied for with match analysis."""
    query = text("""
        SELECT 
            ja.id as application_id,
            ja.resume_url,
            ja.status,
            ja.created_at as applied_at,
            ja.match_score,
            ja.matched_skills,
            ja.missing_skills,
            jp.id as job_id,
            jp.recruiter_id,
            jp.title,
            jp.description,
            jp.required_skills,
            jp.experience_level,
            jp.work_location,
            jp.employment_type,
            jp.created_at as job_created_at
        FROM job_applications ja
        JOIN job_postings jp ON ja.job_id = jp.id
        WHERE ja.seeker_id = :seeker_id
        ORDER BY ja.created_at DESC
    """)
    
    results = db.execute(query, {"seeker_id": current_user["id"]}).fetchall()
    
    return [
        ApplicationResponse(
            id=r.application_id,
            resume_url=r.resume_url,
            status=r.status,
            applied_at=r.applied_at,
            match_score=float(r.match_score),
            matched_skills=r.matched_skills if r.matched_skills else [],
            missing_skills=r.missing_skills if r.missing_skills else [],
            job=JobResponse(
                id=r.job_id,
                recruiter_id=r.recruiter_id,
                title=r.title,
                description=r.description,
                required_skills=r.required_skills,
                experience_level=r.experience_level,
                work_location=r.work_location,
                employment_type=r.employment_type,
                created_at=r.job_created_at
            )
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
        # 1. Fetch job requirements first
        job_res = db.execute(
            text("SELECT required_skills FROM job_postings WHERE id = :job_id"),
            {"job_id": job_id}
        ).fetchone()
        
        if not job_res:
            raise HTTPException(status_code=404, detail="Job not found")
        
        required_skills = job_res.required_skills

        # 2. Parse resume and extract skills
        file_content = await file.read()
        _, parsed_resume = await parse_resume(file_content)
        resume_skills = parsed_resume.technical_skills

        # 3. Calculate match metrics
        match_score, matched_skills, missing_skills = calculate_job_match(resume_skills, required_skills)

        # 4. Upload to Supabase Storage
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{job_id}_{current_user['id']}_{int(datetime.now().timestamp())}.{file_extension}"
        
        supabase.storage.from_("resumes").upload(
            path=unique_filename,
            file=file_content,
            file_options={"content-type": "application/pdf"}
        )
        
        resume_url = supabase.storage.from_("resumes").get_public_url(unique_filename)

        # 5. Save application with analysis results
        db.execute(
            text("""
                INSERT INTO job_applications (
                    job_id, seeker_id, resume_url, 
                    match_score, matched_skills, missing_skills
                )
                VALUES (
                    :job_id, :seeker_id, :resume_url, 
                    :match_score, :matched_skills, :missing_skills
                )
            """),
            {
                "job_id": job_id,
                "seeker_id": current_user["id"],
                "resume_url": resume_url,
                "match_score": match_score,
                "matched_skills": json.dumps(matched_skills),
                "missing_skills": json.dumps(missing_skills)
            }
        )
        db.commit()

        return {
            "message": "Application submitted successfully", 
            "match_score": match_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        }
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit application: {str(e)}"
        )
