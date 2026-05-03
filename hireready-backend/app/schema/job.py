from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

class JobCreate(BaseModel):
    title: str
    description: str
    required_skills: List[str] = []

class JobResponse(BaseModel):
    id: UUID
    recruiter_id: UUID
    title: str
    description: str
    required_skills: List[str]
    created_at: datetime

    class Config:
        from_attributes = True
