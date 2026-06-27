from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

from app.utils.security import hash_password


def create_user(db: Session, user: UserCreate):

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user
    
from app.utils.security import verify_password
from app.utils.security import create_access_token


def login_user(db: Session, email: str, password: str):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    token = create_access_token(
        {
        "sub": user.email,
        "id": user.id,
        "role": user.role
        }
    )


    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }
    
from passlib.context import CryptContext
from app.models.user import User

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def reset_password(db, email, new_password):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        return False

    user.password = pwd_context.hash(new_password)

    db.commit()

    return True

def change_password(
    db: Session,
    user_id: int,
    current_password: str,
    new_password: str
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return {
            "success": False,
            "message": "User not found."
        }

    if not verify_password(
        current_password,
        user.password
    ):
        return {
            "success": False,
            "message": "Current password is incorrect."
        }

    user.password = hash_password(new_password)

    db.commit()

    return {
        "success": True,
        "message": "Password changed successfully."
    }

def get_all_users(db: Session):
    return db.query(User).all()

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        return False

    db.delete(user)
    db.commit()

    return True