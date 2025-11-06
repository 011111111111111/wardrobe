# Digital Wardrobe Application - Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Digital Wardrobe Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Node.js found: $(node --version)" -ForegroundColor Green

# Navigate to project directory
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check backend dependencies
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "`nInstalling backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Check for .env files
if (-not (Test-Path ".env")) {
    Write-Host "`nCreating frontend .env file..." -ForegroundColor Yellow
    "EXPO_PUBLIC_API_URL=http://localhost:3000/api" | Out-File -FilePath ".env" -Encoding utf8
}

if (-not (Test-Path "backend\.env")) {
    Write-Host "`nCreating backend .env file..." -ForegroundColor Yellow
    @"
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-closet
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=ai-closet-images
OPENAI_API_KEY=your_openai_api_key
FAL_API_KEY=your_fal_api_key
CORS_ORIGIN=http://localhost:19006,http://localhost:3001
"@ | Out-File -FilePath "backend\.env" -Encoding utf8
    Write-Host "⚠️  Please configure backend/.env with your MongoDB and API keys" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Starting Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose an option:" -ForegroundColor Yellow
Write-Host "  1. Start Frontend only (Web)" -ForegroundColor White
Write-Host "  2. Start Backend only" -ForegroundColor White
Write-Host "  3. Start Both (Frontend + Backend)" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`nStarting Frontend (Web)..." -ForegroundColor Green
        npm run web
    }
    "2" {
        Write-Host "`nStarting Backend..." -ForegroundColor Green
        Set-Location backend
        npm run dev
        Set-Location ..
    }
    "3" {
        Write-Host "`nStarting Backend..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend'; npm run dev"
        Start-Sleep -Seconds 3
        Write-Host "Starting Frontend (Web)..." -ForegroundColor Green
        npm run web
    }
    default {
        Write-Host "Invalid choice. Starting Frontend (Web) by default..." -ForegroundColor Yellow
        npm run web
    }
}

