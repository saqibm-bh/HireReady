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
            INSERT INTO job_postings (recruiter_id, title, description, required_skills, experience_level, work_location, employment_type)
            VALUES (:recruiter_id, :title, :description, :skills, :experience_level, :work_location, :employment_type)
            RETURNING id, recruiter_id, title, description, required_skills, experience_level, work_location, employment_type, created_at
        """),
        {
            "recruiter_id": recruiter_id,
            "title": request.title,
            "description": request.description,
            "skills": request.required_skills,
            "experience_level": request.experience_level,
            "work_location": request.work_location,
            "employment_type": request.employment_type
        }
    )
    db.commit()
    return result.fetchone()

def get_recruiter_jobs(db: Session, recruiter_id: str):
    """
    Retrieves all job postings for a specific recruiter with applicant counts and avg match score.
    """
    return db.execute(
        text("""
            SELECT 
                jp.id, jp.recruiter_id, jp.title, jp.description, 
                jp.required_skills, jp.experience_level, jp.work_location, 
                jp.employment_type, jp.created_at,
                COUNT(ja.id) as applicant_count,
                COALESCE(AVG(ja.match_score), 0) as avg_match_score
            FROM job_postings jp
            LEFT JOIN job_applications ja ON jp.id = ja.job_id
            WHERE jp.recruiter_id = :rid 
            GROUP BY jp.id
            ORDER BY jp.created_at DESC
        """),
        {"rid": recruiter_id}
    ).fetchall()

def get_all_job_postings(db: Session):
    """
    Retrieves all job postings from the database with applicant counts and avg match score.
    """
    return db.execute(
        text("""
            SELECT 
                jp.id, jp.recruiter_id, jp.title, jp.description, 
                jp.required_skills, jp.experience_level, jp.work_location, 
                jp.employment_type, jp.created_at,
                COUNT(ja.id) as applicant_count,
                COALESCE(AVG(ja.match_score), 0) as avg_match_score
            FROM job_postings jp
            LEFT JOIN job_applications ja ON jp.id = ja.job_id
            GROUP BY jp.id
            ORDER BY jp.created_at DESC
        """)
    ).fetchall()
