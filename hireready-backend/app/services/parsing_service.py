import fitz  # PyMuPDF
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
from app.schema.resume import ResumeParseResponse

# Initialize Groq LLM
llm = ChatGroq(
    groq_api_key=settings.GROQ_API_KEY,
    model_name="llama-3.3-70b-versatile",
    temperature=0
)

# Use with_structured_output for high reliability
# This handles the parsing and ensures ONLY the schema is returned
structured_llm = llm.with_structured_output(ResumeParseResponse)

prompt_template = ChatPromptTemplate.from_template(
    """
    You are an expert HR Assistant and Technical Recruiter. 
    Extract the following information ONLY if it is explicitly mentioned in the resume text. 
    DO NOT add any skills, tools, or information that is not present in the text.
    
    Extract:
    - Full Name
    - Email Address
    - Technical Skills (Include all mentioned programming languages, frameworks, libraries, databases, and development tools/software like version control, containers, etc. only if listed).
    
    Resume Text:
    {resume_text}
    """
)

# New simplified chain
chain = prompt_template | structured_llm

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from PDF bytes using PyMuPDF."""
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

async def parse_resume(file_bytes: bytes) -> tuple[str, ResumeParseResponse]:
    """Standalone function to orchestrate the extraction and parsing of a resume."""
    resume_text = extract_text_from_pdf(file_bytes)
    
    # Invoke the chain
    # Structured LLM returns a ResumeParseResponse object directly
    response = await chain.ainvoke({
        "resume_text": resume_text
    })
    
    return resume_text, response
