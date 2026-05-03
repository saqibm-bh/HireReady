from pydantic import BaseModel
from typing import List, Optional

class MissingSkillDashboard(BaseModel):
    name: str
    importance: int

class DashboardResponse(BaseModel):
    match_score: int
    target_role: Optional[str] = None
    
    # Roadmap Progress
    completed_steps: int
    total_steps: int
    
    # Missing Skills (Top 5)
    top_missing_skills: List[MissingSkillDashboard] = []
    
    # Applications (Static for now)
    recent_applications_count: int = 0
