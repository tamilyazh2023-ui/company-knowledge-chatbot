from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "user"


# NEW
class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str