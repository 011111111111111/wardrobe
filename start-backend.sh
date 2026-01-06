#!/bin/bash
# Bash script to start the backend server

echo "Starting AI Closet Backend Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Navigate to backend directory
cd backend || exit 1

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Copying from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "Please edit .env file with your configuration before starting the server."
    else
        echo "Error: .env.example not found. Please create .env file manually."
        exit 1
    fi
fi

# Start the server
echo "Starting server..."
npm run dev

