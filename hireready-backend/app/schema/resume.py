from pydantic import BaseModel
from typing import List

class ResumeParseResponse(BaseModel):
    name: str
    email: str
    technical_skills: List[str]
