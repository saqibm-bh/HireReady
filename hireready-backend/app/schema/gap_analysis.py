from pydantic import BaseModel
from typing import List

class Skill(BaseModel):
    name: str
    importance: int

class GapAnalysisResponse(BaseModel):
    targetRole: str
    overallMatch: int
    skillsYouHave: List[str]
    skillsMissing: List[Skill]
