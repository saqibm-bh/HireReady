from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from app.schema.job import JobCreate

def create_new_job_posting(db: Session, recruiter_id: str, request: JobCreate):
    """
    Inserts a new job posting into the job_postings table.
    """
    result = db.execute(
        text("""
            INSERT INTO job_postings (recruiter_id, title, description, required_skills)
            VALUES (:recruiter_id, :title, :description, :skills)
            RETURNING id, recruiter_id, title, description, required_skills, created_at
        """),
        {
            "recruiter_id": recruiter_id,
            "title": request.title,
            "description": request.description,
            "skills": request.required_skills
        }
    )
    db.commit()
    return result.fetchone()

def get_recruiter_jobs(db: Session, recruiter_id: str):
    """
    Retrieves all job postings for a specific recruiter.
    """
    return db.execute(
        text("SELECT id, recruiter_id, title, description, required_skills, created_at FROM job_postings WHERE recruiter_id = :rid ORDER BY created_at DESC"),
        {"rid": recruiter_id}
    ).fetchall()
