#!/bin/bash

# Wait for database to be ready
echo "Waiting for database..."
while ! pg_isready -h db -p 5432 -U fapagri_user; do
  sleep 1
done

echo "Database is ready!"

# Run the application
exec uvicorn main:app --host 0.0.0.0 --port 8000