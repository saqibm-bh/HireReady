from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class MissingSkillDashboard(BaseModel):
    name: str
    importance: int

class RecentApplicationDashboard(BaseModel):
    id: UUID
    job_title: str
    match_score: float
    status: str
    applied_at: datetime

class DashboardResponse(BaseModel):
    match_score: int
    target_role: Optional[str] = None
    
    # Roadmap Progress
    completed_steps: int
    total_steps: int
    
    # Missing Skills (Top 5)
    top_missing_skills: List[MissingSkillDashboard] = []
    
    # Applications
    recent_applications_count: int = 0
    recent_applications: List[RecentApplicationDashboard] = []
