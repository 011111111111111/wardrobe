# Backend Setup Helper Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Backend Setup Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$envFile = "backend\.env"

# Check if .env exists
if (-not (Test-Path $envFile)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" $envFile -ErrorAction SilentlyContinue
    if (-not (Test-Path $envFile)) {
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
"@ | Out-File -FilePath $envFile -Encoding utf8
    }
}

Write-Host "Current .env configuration:" -ForegroundColor Green
Write-Host ""
Get-Content $envFile | ForEach-Object {
    if ($_ -match "^(.*?)=(.*)$") {
        $key = $matches[1]
        $value = $matches[2]
        if ($value -match "your_|^$") {
            Write-Host "  $key = [NOT CONFIGURED]" -ForegroundColor Red
        } else {
            Write-Host "  $key = [CONFIGURED]" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Checklist" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. MongoDB:" -ForegroundColor Yellow
Write-Host "   [ ] Sign up at https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
Write-Host "   [ ] Create free cluster" -ForegroundColor White
Write-Host "   [ ] Get connection string" -ForegroundColor White
Write-Host "   [ ] Update MONGODB_URI in backend/.env" -ForegroundColor White
Write-Host ""
Write-Host "2. AWS S3:" -ForegroundColor Yellow
Write-Host "   [ ] Sign up at https://aws.amazon.com/" -ForegroundColor White
Write-Host "   [ ] Create S3 bucket" -ForegroundColor White
Write-Host "   [ ] Create IAM user with S3 access" -ForegroundColor White
Write-Host "   [ ] Get access keys" -ForegroundColor White
Write-Host "   [ ] Update AWS_* in backend/.env" -ForegroundColor White
Write-Host ""
Write-Host "3. OpenAI:" -ForegroundColor Yellow
Write-Host "   [ ] Sign up at https://platform.openai.com/signup" -ForegroundColor White
Write-Host "   [ ] Get API key from https://platform.openai.com/api-keys" -ForegroundColor White
Write-Host "   [ ] Update OPENAI_API_KEY in backend/.env" -ForegroundColor White
Write-Host ""
Write-Host "4. fal.ai:" -ForegroundColor Yellow
Write-Host "   [ ] Sign up at https://fal.ai/" -ForegroundColor White
Write-Host "   [ ] Get API key from dashboard" -ForegroundColor White
Write-Host "   [ ] Update FAL_API_KEY in backend/.env" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 See BACKEND_SETUP_GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "Would you like to:" -ForegroundColor Yellow
Write-Host "  1. Open backend/.env file to edit" -ForegroundColor White
Write-Host "  2. Test backend connection" -ForegroundColor White
Write-Host "  3. Exit" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        notepad $envFile
        Write-Host "`nAfter editing, run this script again to test the connection." -ForegroundColor Yellow
    }
    "2" {
        Write-Host "`nTesting backend..." -ForegroundColor Green
        Set-Location backend
        npm run dev
        Set-Location ..
    }
    "3" {
        Write-Host "Goodbye!" -ForegroundColor Green
    }
    default {
        Write-Host "Invalid choice." -ForegroundColor Red
    }
}

