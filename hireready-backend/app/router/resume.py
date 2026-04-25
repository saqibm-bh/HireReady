from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.parsing_service import parse_resume
from app.schema.resume import ResumeParseResponse

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/parse", response_model=ResumeParseResponse)
async def parse_resume_endpoint(file: UploadFile = File(...)):
    """
    Endpoint to upload and parse a PDF resume.
    Returns structured name, email, and technical skills.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported"
        )
    
    try:
        file_bytes = await file.read()
        result = await parse_resume(file_bytes)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing resume: {str(e)}"
        )
