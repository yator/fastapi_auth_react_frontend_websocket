from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.models.user import (User)
from backend.utils.security import hash_password, verify_password, create_token
from backend.websocket.manager import manager

async def register_user(user_data, db: Session): #handle user registration logic
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = hash_password(user_data.password)
    db_user = User(email=user_data.email, password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    await manager.broadcast(f"New user registered: {user_data.email}")
    return {"message": "User registered successfully"}

def login_user(user_data, db: Session):#handle user login logic
    db_user = db.query(User).filter(User.email == user_data.email).first() #Query the database for a user with the given email
    if not db_user:
        raise HTTPException(status_code=404, detail="Email not found")
    if not verify_password(user_data.password, db_user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_token(db_user.email)
    return {"access_token": token}
