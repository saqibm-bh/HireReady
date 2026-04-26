from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import json

from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.gap_analysis import GapAnalysisResponse
from app.services.gap_analysis_service import perform_gap_analysis

router = APIRouter(
    prefix="/gap-analysis",
    tags=["Gap Analysis"]
)

@router.get("/me", response_model=GapAnalysisResponse)
async def get_my_gap_analysis(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Performs a gap analysis for the current user based on their cumulative skills
    and their target role.
    """
    # 1. Ensure user has a target role
    target_role = current_user.target_role
    if not target_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Target role is not set. Please set a target role during resume upload."
        )

    # 1. Query the most recent gap analysis for the user
    result = db.execute(
        text("""
            SELECT target_role, match_percentage, missing_skills, present_skills 
            FROM gap_analyses 
            WHERE user_id = :user_id 
            ORDER BY created_at DESC 
            LIMIT 1
        """),
        {"user_id": current_user.id}
    ).fetchone()
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No gap analysis found. Please upload a resume to generate one."
        )
        
    # Handle missing_skills which might be a string or a list depending on the driver
    missing_skills_data = result.missing_skills
    if isinstance(missing_skills_data, str):
        missing_skills_data = json.loads(missing_skills_data)
        
    return GapAnalysisResponse(
        targetRole=result.target_role,
        overallMatch=int(result.match_percentage) if result.match_percentage is not None else 0,
        skillsYouHave=result.present_skills if result.present_skills else [],
        skillsMissing=missing_skills_data if missing_skills_data else []
    )

