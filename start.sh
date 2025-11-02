#!/bin/bash

echo "🚀 Starting FAP Agri Farm Management System..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if not exists
createdb -h localhost -p 5432 -U postgres wad_fap_agri_db 2>/dev/null || echo "ℹ️ Database already exists"

# Setup backend
echo "🔧 Setting up backend..."
cd backend

# Create tables and users
python -c "
from database import engine
from models import Base
Base.metadata.create_all(bind=engine)
print('✅ Database tables created')
"

# Create users if not exist
python create_users_simple.py

echo "🚀 Starting backend server on http://localhost:8000"
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Setup frontend
echo "🔧 Setting up frontend..."
cd ../frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "🚀 Starting frontend server on http://localhost:3000"
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 FAP Agri Farm Management System is starting!"
echo ""
echo "📍 Backend API: http://localhost:8000"
echo "📍 API Documentation: http://localhost:8000/docs"
echo "📍 Frontend App: http://localhost:3000"
echo ""
echo "👤 Demo Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "👤 Field Worker:"
echo "   Username: field1" 
echo "   Password: field123"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interruption
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait