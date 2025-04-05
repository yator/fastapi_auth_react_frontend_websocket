
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.schemas.user import UserCreate, UserLogin
from backend.services.auth_logic import register_user, login_user
from backend.db.database import get_db

router = APIRouter()
@router.post("/register")#endpoint for user registration
async def register(user: UserCreate, db: Session = Depends(get_db)):
    return await register_user(user, db)

@router.post("/login")#endpoint for user login
async def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(user, db)
