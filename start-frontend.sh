#!/bin/bash

echo "🚀 Starting FAP Agri Frontend..."

cd /home/titan/project/wad-fap-agri/frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting frontend development server..."
echo "📍 Frontend App: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo ""
echo "👤 Demo Credentials:"
echo "   Username: admin | Password: admin123"
echo "   Username: field1 | Password: field123"
echo ""

npm start