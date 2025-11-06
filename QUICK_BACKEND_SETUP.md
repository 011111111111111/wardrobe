# Quick Backend Setup - Get Started in 5 Minutes!

## Step 1: MongoDB Setup (REQUIRED - FREE)

### Option A: MongoDB Atlas (Easiest - 2 minutes)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (free account)
3. **Create a FREE cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Click "Create"
4. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin` (or any name)
   - Password: Create a password (SAVE IT!)
   - Click "Add User"
5. **Allow Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"
6. **Get Connection String:**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `ai-closet`

   Example: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ai-closet?retryWrites=true&w=majority`

### Option B: Local MongoDB (If you prefer)

1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Use: `mongodb://localhost:27017/ai-closet`

---

## Step 2: Update backend/.env

Open `backend/.env` and update:

```env
MONGODB_URI=your_connection_string_here
```

**For now, you can leave the other fields as placeholders** - the app will work for basic features!

---

## Step 3: Start Backend

```bash
cd backend
npm run dev
```

You should see: "✅ MongoDB connected successfully"

---

## Step 4: Test Adding Photos

Now try adding a photo in the frontend! It should work for basic storage.

---

## Optional: Full Setup (For AI Features)

### AWS S3 (For Image Storage)
- Sign up: https://aws.amazon.com/
- Create S3 bucket
- Get access keys
- Update `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME` in `.env`

### OpenAI (For Auto-Categorization)
- Sign up: https://platform.openai.com/signup
- Get API key: https://platform.openai.com/api-keys
- Update `OPENAI_API_KEY` in `.env`

### fal.ai (For Background Removal)
- Sign up: https://fal.ai/
- Get API key from dashboard
- Update `FAL_API_KEY` in `.env`

---

## Need Help?

If you get stuck, tell me which step and I'll help!

