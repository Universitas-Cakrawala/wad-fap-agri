import hashlib
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import User, Base

# Create tables
Base.metadata.create_all(bind=engine)


def simple_hash(password: str) -> str:
    """Simple hash function for development"""
    return hashlib.sha256(password.encode()).hexdigest()


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
                hashed_password=simple_hash("admin123"),
            )
            db.add(admin_user)
            db.commit()
            print("✅ Admin user created successfully!")
            print("Username: admin")
            print("Password: admin123")
        else:
            print("ℹ️ Admin user already exists!")

        # Create a field worker for testing
        field_user = db.query(User).filter(User.username == "field1").first()
        if not field_user:
            field_user = User(
                username="field1",
                email="field1@fapagri.com",
                full_name="Field Worker 1",
                role="field_worker",
                hashed_password=simple_hash("field123"),
            )
            db.add(field_user)
            db.commit()
            print("✅ Field worker user created!")
            print("Username: field1")
            print("Password: field123")

    except Exception as e:
        print(f"❌ Error creating users: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    create_admin_user()
