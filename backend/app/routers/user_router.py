from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate
from app.services.user_service import (
    create_user,
    get_all_users,
    delete_user,
)

from app.schemas.login import LoginRequest

from app.services.user_service import login_user
from app.schemas.login import ForgotPasswordRequest
from app.services.user_service import reset_password

from app.schemas.user import ChangePasswordRequest
from app.utils.security import get_current_user
from app.services.user_service import change_password
from app.models.user import User

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

@router.post("/change-password")
def update_password(
    request: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return change_password(
        db,
        current_user["id"],
        request.current_password,
        request.new_password
    )

@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    success = reset_password(
        db,
        request.email,
        request.new_password
    )

    if not success:
        return {
            "message": "Email not found."
        }

    return {
        "message": "Password updated successfully."
    }
# ----------------------------
# Get All Users
# ----------------------------

@router.get("/all")
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_all_users(db)

@router.get("/me")
def get_current_user_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = (
        db.query(User)
        .filter(User.id == current_user["id"])
        .first()
    )

    if not user:
        return {"message": "User not found"}

    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
    }


# ----------------------------
# Delete User
# ----------------------------

@router.delete("/{user_id}")
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    success = delete_user(db, user_id)

    if not success:
        return {
            "message": "User not found"
        }

    return {
        "message": "User deleted successfully"
    }