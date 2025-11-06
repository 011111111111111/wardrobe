# AI Closet - Full Stack Setup Guide

This guide will help you set up and run the AI Closet application with the full-stack architecture.

## Architecture Overview

```
┌──────────────────────────┐
│        Users (UI)         │
│ ┌───────────┐ ┌────────┐ │
│ │ Web (React│ │ Mobile │ │
│ │ Browser)  │ │ (Expo) │ │
│ └───────────┘ └────────┘ │
└──────────┬──────────────┘
           │ HTTPS (API Requests)
           ▼
┌────────────────────────────────┐
│         Backend Service         │
│      Node.js + Express API      │
│  - Background removal           │
│  - Metadata tagging             │
│  - Laundry & usage tracking     │
│  - Outfit save/view             │
└───────────┬────────────────────┘
            │
            ▼
┌────────────────────────────────┐
│        MongoDB Database        │
│ Stores:                        │
│  - Clothing metadata           │
│  - Usage statistics            │
│  - User data                   │
└────────────────────────────────┘
            │
            ▼
┌────────────────────────────────┐
│        Image Storage (S3)       │
│  - Clothing images              │
│  - Background removed assets    │
└────────────────────────────────┘
```

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **AWS Account** (for S3) - [Sign up](https://aws.amazon.com/)
4. **API Keys:**
   - OpenAI API key - [Get here](https://platform.openai.com/api-keys)
   - fal.ai API key - [Get here](https://fal.ai/)
   - (Optional) Kwai Kolors API keys for virtual try-on

## Setup Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# - MongoDB URI (local or Atlas)
# - AWS S3 credentials
# - API keys
```

**Configure `.env` file:**
```env
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
```

### 2. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows, start MongoDB service from Services
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 3. AWS S3 Setup

1. Create an S3 bucket in AWS Console
2. Configure bucket permissions (public read for images)
3. Create IAM user with S3 access
4. Get access key and secret key
5. Update `.env` with credentials

**S3 Bucket Policy (for public read):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 4. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend should now be running on `http://localhost:3000`

### 5. Frontend Setup (Mobile - Expo)

```bash
# Navigate to project root
cd ..

# Install dependencies (if not already done)
npm install

# Create .env file in root directory
echo "EXPO_PUBLIC_API_URL=http://localhost:3000/api" > .env

# Start Expo development server
npm start
```

**For physical device:**
- Install Expo Go app on your phone
- Scan QR code from terminal
- Make sure your phone and computer are on the same network

**For emulator:**
- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)

### 6. Frontend Setup (Web)

The Expo app already supports web. To run:

```bash
# Start Expo with web flag
npm run web

# Or from Expo CLI
npx expo start --web
```

The web app will open at `http://localhost:19006`

## API Endpoints

### Clothing
- `GET /api/clothing?userId=<userId>` - Get all clothing items
- `GET /api/clothing/:id` - Get single clothing item
- `POST /api/clothing` - Create new clothing item (multipart/form-data)
- `PUT /api/clothing/:id` - Update clothing item
- `DELETE /api/clothing/:id` - Delete clothing item
- `PATCH /api/clothing/:id/usage` - Update usage (worn/washed)

### Outfits
- `GET /api/outfits?userId=<userId>` - Get all outfits
- `GET /api/outfits/:id` - Get single outfit
- `POST /api/outfits` - Create new outfit
- `PUT /api/outfits/:id` - Update outfit
- `DELETE /api/outfits/:id` - Delete outfit

### Health
- `GET /api/health` - Health check endpoint

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongosh` or check MongoDB service
- Verify `.env` file has all required variables
- Check port 3000 is not in use

### Images not uploading
- Verify AWS S3 credentials are correct
- Check S3 bucket permissions
- Ensure bucket name matches `.env` configuration

### API connection errors
- Verify backend is running on port 3000
- Check `EXPO_PUBLIC_API_URL` in frontend `.env`
- For physical device, use your computer's local IP: `http://192.168.x.x:3000/api`

### CORS errors
- Update `CORS_ORIGIN` in backend `.env` to include your frontend URLs

## Development Tips

1. **Backend logs**: Check console for API request logs and errors
2. **MongoDB**: Use MongoDB Compass to view database contents
3. **S3**: Use AWS Console to verify image uploads
4. **API testing**: Use Postman or curl to test endpoints

## Next Steps

- Set up authentication (JWT tokens)
- Add user management
- Implement virtual try-on feature
- Set up production deployment
- Add monitoring and logging

