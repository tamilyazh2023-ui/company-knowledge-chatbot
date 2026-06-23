from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate
from app.services.user_service import create_user

from app.schemas.login import LoginRequest

from app.services.user_service import login_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    return create_user(db, user)

@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    result = login_user(
        db,
        request.email,
        request.password
    )

    if result is None:
        return {
            "message": "Invalid Email or Password"
        }

    return result