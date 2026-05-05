from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
import json
from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.dashboard import DashboardResponse, MissingSkillDashboard, RecentApplicationDashboard

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/me", response_model=DashboardResponse)
def get_seeker_dashboard(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Fetch Latest Match Score & Missing Skills
    latest_gap = db.execute(
        text("""
            SELECT id, match_percentage, target_role, missing_skills 
            FROM gap_analyses 
            WHERE user_id = :user_id 
            ORDER BY created_at DESC 
            LIMIT 1
        """),
        {"user_id": current_user["id"]}
    ).fetchone()
    
    # 2. Fetch Recent Applications
    applications_query = db.execute(
        text("""
            SELECT 
                ja.id,
                jp.title as job_title,
                ja.match_score,
                ja.status,
                ja.created_at as applied_at
            FROM job_applications ja
            JOIN job_postings jp ON ja.job_id = jp.id
            WHERE ja.seeker_id = :seeker_id
            ORDER BY ja.created_at DESC
            LIMIT 3
        """),
        {"seeker_id": current_user["id"]}
    ).fetchall()
    
    recent_apps = [
        RecentApplicationDashboard(
            id=app.id,
            job_title=app.job_title,
            match_score=float(app.match_score),
            status=app.status,
            applied_at=app.applied_at
        ) for app in applications_query
    ]

    if not latest_gap:
        # Fallback for new users
        return DashboardResponse(
            match_score=0,
            completed_steps=0,
            total_steps=0,
            top_missing_skills=[],
            recent_applications_count=len(recent_apps),
            recent_applications=recent_apps
        )
    
    # Parse missing skills
    missing_skills_data = latest_gap[3]
    if isinstance(missing_skills_data, str):
        missing_skills_data = json.loads(missing_skills_data)
    
    top_missing = [
        MissingSkillDashboard(name=s["name"], importance=s["importance"])
        for s in missing_skills_data[:5] # Top 5
    ] if missing_skills_data else []
    
    # 3. Fetch Roadmap Progress
    roadmap = db.execute(
        text("SELECT steps FROM learning_roadmaps WHERE gap_analysis_id = :gap_id"),
        {"gap_id": latest_gap[0]}
    ).fetchone()
    
    completed_steps = 0
    total_steps = 0
    if roadmap:
        steps = roadmap[0]
        if isinstance(steps, str):
            steps = json.loads(steps)
        total_steps = len(steps)
        completed_steps = sum(1 for s in steps if s.get("completed"))
        
    return DashboardResponse(
        match_score=latest_gap[1] or 0,
        target_role=latest_gap[2],
        completed_steps=completed_steps,
        total_steps=total_steps,
        top_missing_skills=top_missing,
        recent_applications_count=len(recent_apps),
        recent_applications=recent_apps
    )
