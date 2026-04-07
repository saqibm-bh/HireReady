from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schema.user import UserCreate, UserResponse, LoginRequest
from app.schema.token import TokenResponse
from app.services.hash import get_password_hash, verify_password
from app.services.auth import create_access_token

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.execute(
        text("SELECT id FROM users WHERE email = :email"),
        {"email": user.email}
    ).fetchone()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Hash the password
    hashed_password = get_password_hash(user.password)
    
    # Insert new user using raw SQL
    result = db.execute(
        text("""
            INSERT INTO users (name, email, password, role)
            VALUES (:name, :email, :password, :role)
            RETURNING id, email
        """),
        {"name": user.name, "email": user.email, "password": hashed_password, "role": user.role}
    )
    db.commit()
    
    new_user = result.fetchone()
    
    # Return matched UserResponse
    return UserResponse(id=str(new_user.id), email=new_user.email)

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    # Fetch user by email
    user = db.execute(
        text("SELECT id, email, password, role FROM users WHERE email = :email"),
        {"email": login_data.email}
    ).fetchone()
    
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token including role in payload
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    
    return TokenResponse(access_token=access_token, token_type="bearer")
