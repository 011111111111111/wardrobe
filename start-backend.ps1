# PowerShell script to start the backend server
Write-Host "Starting AI Closet Backend Server..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Navigate to backend directory
Set-Location backend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found. Copying from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "Please edit .env file with your configuration before starting the server." -ForegroundColor Yellow
    } else {
        Write-Host "Error: .env.example not found. Please create .env file manually." -ForegroundColor Red
        exit 1
    }
}

# Start the server
Write-Host "Starting server..." -ForegroundColor Green
npm run dev

