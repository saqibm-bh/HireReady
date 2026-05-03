from pydantic import BaseModel
from typing import List

class RoadmapStep(BaseModel):
    step: int
    skill: str
    why_it_matters: str
    estimated_time: str
    completed: bool = False

class RoadmapResponse(BaseModel):
    steps: List[RoadmapStep]

Roadmap = RoadmapResponse
