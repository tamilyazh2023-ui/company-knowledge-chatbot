from sqlalchemy.orm import Session

from app.models.website import Website


def save_website(db: Session, url: str):
    website = Website(
        url=url
    )

    db.add(website)
    db.commit()
    db.refresh(website)

    return website


def get_all_websites(db: Session):
    return (
        db.query(Website)
        .order_by(Website.crawled_at.desc())
        .all()
    )


def delete_website(db: Session, website_id: int):
    website = (
        db.query(Website)
        .filter(Website.id == website_id)
        .first()
    )

    if not website:
        return False

    db.delete(website)
    db.commit()

    return True