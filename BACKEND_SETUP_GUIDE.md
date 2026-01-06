# Backend Setup Guide - Step by Step

This guide will help you set up all the required services for the Digital Wardrobe Application backend.

## Required Services

1. **MongoDB** (Database) - Free tier available
2. **AWS S3** (Image Storage) - Free tier available
3. **OpenAI API** (AI Categorization) - Paid (but very cheap)
4. **fal.ai API** (Background Removal) - Paid (but very cheap)

---

## Step 1: MongoDB Setup (FREE)

### Option A: MongoDB Atlas (Cloud - Recommended for beginners)

1. **Sign up for MongoDB Atlas:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free account
   - Choose the FREE tier (M0 Sandbox)

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"

3. **Set up Database Access:**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (SAVE THESE!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access:**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" in the left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ai-closet` (or any name you want)

   Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-closet?retryWrites=true&w=majority`

### Option B: Local MongoDB (Advanced)

1. **Download MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Download for Windows
   - Install with default settings

2. **Start MongoDB Service:**
   - MongoDB should start automatically as a Windows service
   - Or run: `mongod` in a terminal

3. **Connection String:**
   - Use: `mongodb://localhost:27017/ai-closet`

---

## Step 2: AWS S3 Setup (FREE Tier Available)

### Create AWS Account

1. **Sign up for AWS:**
   - Go to https://aws.amazon.com/
   - Click "Create an AWS Account"
   - Follow the signup process (requires credit card, but free tier won't charge you)

2. **Create S3 Bucket:**
   - Go to AWS Console: https://console.aws.amazon.com/
   - Search for "S3" in the search bar
   - Click "Create bucket"
   - Bucket name: `ai-closet-images` (or any unique name)
   - Region: Choose closest to you (e.g., `us-east-1`)
   - **Uncheck "Block all public access"** (we need public read for images)
   - Acknowledge the warning
   - Click "Create bucket"

3. **Configure Bucket Permissions:**
   - Click on your bucket
   - Go to "Permissions" tab
   - Scroll to "Bucket policy"
   - Click "Edit" and paste this (replace `your-bucket-name`):

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

4. **Create IAM User for API Access:**
   - Go to IAM Console: https://console.aws.amazon.com/iam/
   - Click "Users" → "Create user"
   - Username: `ai-closet-s3-user`
   - Click "Next"
   - Select "Attach policies directly"
   - Search for and select "AmazonS3FullAccess"
   - Click "Next" → "Create user"

5. **Get Access Keys:**
   - Click on the user you just created
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Choose "Application running outside AWS"
   - Click "Next" → "Create access key"
   - **SAVE THESE KEYS NOW** (you won't see them again):
     - Access Key ID
     - Secret Access Key

---

## Step 3: OpenAI API Setup (Paid - Very Cheap)

1. **Sign up for OpenAI:**
   - Go to https://platform.openai.com/signup
   - Create an account
   - Add payment method (required, but usage is very cheap)

2. **Get API Key:**
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it: "AI Closet"
   - Copy the key (you won't see it again)
   - Save it securely

3. **Pricing:**
   - GPT-4o: ~$0.002 per image categorization
   - Very affordable for personal use

---

## Step 4: fal.ai API Setup (Paid - Very Cheap)

1. **Sign up for fal.ai:**
   - Go to https://fal.ai/
   - Click "Sign Up" or "Get Started"
   - Create an account

2. **Get API Key:**
   - Go to your dashboard
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key
   - Save it securely

3. **Pricing:**
   - Background removal: ~$0.002 per image
   - Very affordable for personal use

---

## Step 5: Configure Backend

1. **Edit `backend/.env` file:**

```env
PORT=3000
NODE_ENV=development

# MongoDB - Use your connection string from Step 1
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-closet?retryWrites=true&w=majority

# AWS S3 - Use your credentials from Step 2
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_REGION=us-east-1
S3_BUCKET_NAME=ai-closet-images

# API Keys - Use your keys from Steps 3 and 4
OPENAI_API_KEY=sk-your-openai-key-here
FAL_API_KEY=your-fal-api-key-here

# CORS - Allow frontend to connect
CORS_ORIGIN=http://localhost:19006,http://localhost:3001
```

2. **Save the file**

---

## Step 6: Test the Backend

1. **Start the backend:**
```bash
cd backend
npm run dev
```

2. **Check if it's running:**
   - You should see: "✅ MongoDB connected successfully"
   - And: "🚀 Server running on port 3000"

3. **Test the API:**
   - Open: http://localhost:3000/api/health
   - You should see: `{"status":"ok","database":"connected",...}`

---

## Troubleshooting

### MongoDB Connection Issues
- Check your connection string is correct
- Verify network access allows your IP
- Check username/password are correct

### AWS S3 Issues
- Verify bucket name matches in .env
- Check IAM user has S3 permissions
- Verify bucket policy allows public read

### API Key Issues
- Check keys are copied correctly (no extra spaces)
- Verify API keys are active in their respective dashboards
- Check you have credits/balance in OpenAI and fal.ai accounts

---

## Cost Estimate

For personal use (50 images/month):
- MongoDB Atlas: **FREE** (M0 tier)
- AWS S3: **FREE** (first 5GB free)
- OpenAI: ~$0.10/month (50 images × $0.002)
- fal.ai: ~$0.10/month (50 images × $0.002)

**Total: ~$0.20/month** (mostly free!)

---

## Need Help?

If you get stuck on any step, let me know which step and I'll help you through it!

