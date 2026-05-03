from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import user, resume, gap_analysis, roadmap, profile, dashboard, job

app = FastAPI(title="HireReady Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(resume.router)
app.include_router(gap_analysis.router)
app.include_router(roadmap.router)
app.include_router(profile.router)
app.include_router(dashboard.router)
app.include_router(job.router)


