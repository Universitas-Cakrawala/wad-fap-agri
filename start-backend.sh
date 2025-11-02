#!/bin/bash

echo "🚀 Starting FAP Agri Backend..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

echo "✅ PostgreSQL is running"

# Setup backend
cd /home/titan/project/wad-fap-agri/backend

# Create tables and users
python -c "
from database import engine
from models import Base
Base.metadata.create_all(bind=engine)
print('✅ Database tables created/verified')
"

# Create users if not exist
python create_users_simple.py

echo ""
echo "🚀 Starting backend server..."
echo "📍 Backend API: http://localhost:8000"
echo "📍 API Documentation: http://localhost:8000/docs"
echo ""
echo "👤 Demo Credentials:"
echo "   Username: admin | Password: admin123"
echo "   Username: field1 | Password: field123"
echo ""

uvicorn main:app --reload --host 0.0.0.0 --port 8000