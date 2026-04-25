from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from app.services.parsing_service import parse_resume
from app.schema.resume import ResumeParseResponse, ResumeHistoryResponse, ResumeHistoryItem
from app.database.connection import get_db
from app.services.auth import get_current_user

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/parse", response_model=ResumeParseResponse)
async def parse_resume_endpoint(
    file: UploadFile = File(...),
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
        
        db.execute(
            text("""
                INSERT INTO resumes (user_id, raw_text, parsed_skills, file_url) 
                VALUES (:user_id, :raw_text, :skills, :filename)
            """),
            {
                "user_id": user_id,
                "raw_text": raw_text,
                "skills": result.technical_skills,
                "filename": file.filename
            }
        )
        db.commit()
        
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
    """Returns a unique list of all skills extracted from all resumes uploaded by the user."""
    resumes = db.execute(
        text("SELECT parsed_skills FROM resumes WHERE user_id = :user_id"),
        {"user_id": current_user.id}
    ).fetchall()
    
    unique_skills = set()
    for r in resumes:
        if r.parsed_skills:
            for skill in r.parsed_skills:
                unique_skills.add(skill)
    
    return sorted(list(unique_skills))
