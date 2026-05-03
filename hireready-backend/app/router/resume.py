from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import json
from app.services.parsing_service import parse_resume
from app.schema.resume import ResumeParseResponse, ResumeHistoryResponse, ResumeHistoryItem
from app.database.connection import get_db
from app.services.auth import get_current_user
from app.services.gap_analysis_service import perform_gap_analysis
from app.services.roadmap_service import update_roadmap_for_gap_analysis

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/parse", response_model=ResumeParseResponse)
async def parse_resume_endpoint(
    file: UploadFile = File(...),
    target_role: str = Form(...),
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Endpoint to upload and parse a PDF resume.
    Saves the result to the database for the current user.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported"
        )
    
    try:
        file_bytes = await file.read()
        raw_text, result = await parse_resume(file_bytes)
        
        # Save to database
        # Note: current_user is a Row object from fetchone()
        user_id = current_user.id
        
        # Update user's target role
        db.execute(
            text("UPDATE users SET target_role = :target_role WHERE id = :user_id"),
            {"target_role": target_role, "user_id": user_id}
        )
        
        db.execute(
            text("""
                INSERT INTO resumes (user_id, raw_text, parsed_skills, file_url) 
                VALUES (:user_id, :raw_text, :skills, :filename)
            """),
            {
                "user_id": user_id,
                "raw_text": raw_text,
                "skills": json.dumps(result.technical_skills),
                "filename": file.filename
            }
        )
        db.commit()
        # Get existing skills from user record
        existing_skills = set(current_user.skills) if current_user.skills else set()
        
        # Merge with current resume skills
        if result.technical_skills:
            for skill in result.technical_skills:
                existing_skills.add(skill)
        
        # Update user record with merged unique skills
        db.execute(
            text("UPDATE users SET skills = :skills WHERE id = :user_id"),
            {"skills": json.dumps(list(existing_skills)), "user_id": user_id}
        )
        db.commit()
                
        # Perform gap analysis using the now-complete user skills list
        overall_match, skills_you_have, skills_missing = perform_gap_analysis(
            user_skills=list(existing_skills),
            target_role=target_role
        )
        
        # Serialize missing_skills for JSONB
        missing_skills_json = json.dumps([{"name": s.name, "importance": s.importance} for s in skills_missing])
        
        # Insert into gap_analyses and get the ID
        gap_res = db.execute(
            text("""
                INSERT INTO gap_analyses (user_id, target_role, match_percentage, missing_skills, present_skills)
                VALUES (:user_id, :target_role, :match_percentage, :missing_skills, :present_skills)
                RETURNING id
            """),
            {
                "user_id": user_id,
                "target_role": target_role,
                "match_percentage": overall_match,
                "missing_skills": missing_skills_json,
                "present_skills": skills_you_have
            }
        ).fetchone()
        
        db.commit()

        # 4. Generate/Update learning roadmap
        if gap_res:
            await update_roadmap_for_gap_analysis(
                db=db,
                user_id=user_id,
                gap_analysis_id=gap_res.id,
                missing_skills=skills_missing,
                target_role=target_role
            )
        
        return result
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing resume: {str(e)}"
        )

@router.get("/history", response_model=ResumeHistoryResponse)
async def get_resume_history(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Returns the resume upload history for the current user."""
    resumes = db.execute(
        text("SELECT id, file_url as filename, created_at, parsed_skills FROM resumes WHERE user_id = :user_id ORDER BY created_at DESC"),
        {"user_id": current_user.id}
    ).fetchall()
    
    history = [
        ResumeHistoryItem(
            id=str(r.id),
            filename=r.filename,
            created_at=r.created_at,
            skills=r.parsed_skills if r.parsed_skills else []
        ) for r in resumes
    ]
    
    return ResumeHistoryResponse(history=history)

@router.get("/skills", response_model=List[str])
async def get_cumulative_skills(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Returns a unique list of all skills for the user."""
    return sorted(current_user.skills) if current_user.skills else []
