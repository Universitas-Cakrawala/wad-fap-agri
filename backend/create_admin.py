# Buat user admin default
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import User, Base
from auth import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)


def create_admin_user():
    db = SessionLocal()
    try:
        # Check if admin user exists
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            admin_user = User(
                username="admin",
                email="admin@fapagri.com",
                full_name="Administrator",
                role="admin",
                hashed_password=get_password_hash("admin123"),
            )
            db.add(admin_user)
            db.commit()
            print("Admin user created successfully!")
            print("Username: admin")
            print("Password: admin123")
        else:
            print("Admin user already exists!")
    finally:
        db.close()


if __name__ == "__main__":
    create_admin_user()
