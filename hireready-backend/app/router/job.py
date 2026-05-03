from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.job import JobCreate, JobResponse
from app.services.job_service import create_new_job_posting, get_recruiter_jobs

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

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
            created_at=new_job[5]
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
            created_at=r[5]
        ) for r in results
    ]
