from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    email: EmailStr#Validates that the input is a proper email address
    password: constr(min_length=6, max_length=64)  # require min 6 chars

class UserLogin(BaseModel):
    email: EmailStr#Validates that the input is a proper email address
    password: str
