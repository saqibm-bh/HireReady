from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ResumeParseResponse(BaseModel):
    name: str
    email: str
    technical_skills: List[str]

class ResumeHistoryItem(BaseModel):
    id: str
    filename: Optional[str]
    created_at: datetime
    skills: List[str]

class ResumeHistoryResponse(BaseModel):
    history: List[ResumeHistoryItem]
