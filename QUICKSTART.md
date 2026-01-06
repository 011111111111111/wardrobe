# Quick Start Guide

Get the AI Closet application running in 5 minutes!

## Prerequisites Check

- [ ] Node.js installed (v18+)
- [ ] MongoDB running (local or Atlas)
- [ ] AWS S3 bucket created
- [ ] API keys ready (OpenAI, fal.ai)

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your credentials

# Start backend server
npm run dev
```

**Backend should be running on http://localhost:3000**

## Step 2: Frontend Setup (2 minutes)

```bash
# From project root
cd ..

# Install dependencies (if not done)
npm install

# Create .env file
echo "EXPO_PUBLIC_API_URL=http://localhost:3000/api" > .env

# Start Expo
npm start
```

## Step 3: Run the App (1 minute)

**For Mobile:**
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Or scan QR code with Expo Go app

**For Web:**
- Press `w` for web browser
- Or run: `npm run web`

## Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongosh
# or check service status

# Verify .env file exists and has all variables
cat backend/.env
```

### Frontend can't connect to backend
- Check backend is running: `curl http://localhost:3000/api/health`
- For physical device, update `.env` with your computer's IP:
  ```
  EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
  ```

### Images not uploading
- Verify AWS credentials in `backend/.env`
- Check S3 bucket permissions
- Ensure bucket name matches `.env`

## Next Steps

- Read [README_SETUP.md](README_SETUP.md) for detailed setup
- Check [backend/README.md](backend/README.md) for API documentation
- Customize your configuration

## Need Help?

- Check the logs in terminal
- Verify all environment variables are set
- Ensure all services are running

