# Quick MongoDB Atlas Setup Helper
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Atlas Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will help you set up MongoDB Atlas (FREE) in 2 minutes!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Steps:" -ForegroundColor Green
Write-Host "1. I'll open the MongoDB Atlas signup page" -ForegroundColor White
Write-Host "2. You'll create a free account and cluster" -ForegroundColor White
Write-Host "3. You'll get a connection string" -ForegroundColor White
Write-Host "4. We'll update your backend/.env file" -ForegroundColor White
Write-Host ""
$continue = Read-Host "Ready to start? (Y/N)"

if ($continue -eq "Y" -or $continue -eq "y") {
    Write-Host "`nOpening MongoDB Atlas signup page..." -ForegroundColor Green
    Start-Process "https://www.mongodb.com/cloud/atlas/register"
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  Follow these steps:" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Sign up for a free account" -ForegroundColor Yellow
    Write-Host "2. Create a FREE cluster (M0 Sandbox)" -ForegroundColor Yellow
    Write-Host "3. Create a database user:" -ForegroundColor Yellow
    Write-Host "   - Go to 'Database Access'" -ForegroundColor White
    Write-Host "   - Click 'Add New Database User'" -ForegroundColor White
    Write-Host "   - Choose 'Password' authentication" -ForegroundColor White
    Write-Host "   - Create username and password (SAVE IT!)" -ForegroundColor White
    Write-Host "4. Allow network access:" -ForegroundColor Yellow
    Write-Host "   - Go to 'Network Access'" -ForegroundColor White
    Write-Host "   - Click 'Add IP Address'" -ForegroundColor White
    Write-Host "   - Click 'Allow Access from Anywhere'" -ForegroundColor White
    Write-Host "5. Get connection string:" -ForegroundColor Yellow
    Write-Host "   - Go to 'Database' → Click 'Connect'" -ForegroundColor White
    Write-Host "   - Choose 'Connect your application'" -ForegroundColor White
    Write-Host "   - Copy the connection string" -ForegroundColor White
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    $connectionString = Read-Host "Paste your MongoDB connection string here (replace <password> and <dbname>)"
    
    if ($connectionString) {
        # Update .env file
        $envFile = "backend\.env"
        $envContent = Get-Content $envFile -Raw
        
        # Replace MONGODB_URI
        $envContent = $envContent -replace "MONGODB_URI=.*", "MONGODB_URI=$connectionString"
        
        Set-Content -Path $envFile -Value $envContent
        
        Write-Host "`n✅ Updated backend/.env with your MongoDB connection string!" -ForegroundColor Green
        Write-Host "`nNow you can start the backend with: cd backend && npm run dev" -ForegroundColor Yellow
    } else {
        Write-Host "No connection string provided. You can manually update backend/.env later." -ForegroundColor Yellow
    }
} else {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
}

