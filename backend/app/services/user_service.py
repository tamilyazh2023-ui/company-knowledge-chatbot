from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

from app.utils.security import hash_password


def create_user(db: Session, user: UserCreate):

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password)
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
    