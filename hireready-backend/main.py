from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import user


app = FastAPI(title="HireReady Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)


