from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

class JobCreate(BaseModel):
    title: str
    description: str
    required_skills: List[str] = []
    experience_level: str
    work_location: str
    employment_type: str

class JobResponse(BaseModel):
    id: UUID
    recruiter_id: UUID
    title: str
    description: str
    required_skills: List[str]
    experience_level: str
    work_location: str
    employment_type: str
    created_at: datetime
    applicant_count: int = 0
    avg_match_score: float = 0.0

    class Config:
        from_attributes = True

class ApplicationResponse(BaseModel):
    id: UUID
    resume_url: str
    status: str
    applied_at: datetime
    match_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    job: JobResponse

class JobApplicantResponse(BaseModel):
    id: UUID
    job_id: UUID
    job_title: str
    seeker_id: UUID
    seeker_name: str
    seeker_email: str
    resume_url: str
    status: str
    match_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    applied_at: datetime
