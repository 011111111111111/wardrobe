# Verify and Fix Authentication Issue

## The Issue
MongoDB setup is done, but authentication still fails. This is NOT a git issue - the code is already on the server.

## What to Check

### Step 1: Verify MongoDB User Exists

SSH into database instance and verify the user was created:

```bash
ssh -i ~/.ssh/devops.pem ubuntu@3.110.174.209

# Connect as admin
mongosh "mongodb://admin:admin123@localhost:27017/admin"

# Check if wardrobe_user exists
use Digital_Wardrobe
db.getUsers()

# If user doesn't exist, create it:
db.createUser({
  user: 'wardrobe_user',
  pwd: 'wardrobe123',
  roles: [{ role: 'readWrite', db: 'Digital_Wardrobe' }]
})

# Exit
exit
```

### Step 2: Get Database Private IP

```bash
# On database instance
hostname -I
# Should show something like: 172.31.0.46
```

### Step 3: Update Application Configuration

SSH to app instance and check/update MongoDB connection:

```bash
ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50

# Check current MongoDB URI in environment
pm2 env 0 | grep MONGODB_URI

# Check .env file
cat /home/ubuntu/digital-wardrobe/.env.production

# Check ecosystem config
cat /home/ubuntu/digital-wardrobe/ecosystem.config.js | grep MONGODB_URI
```

### Step 4: Test MongoDB Connection from App Instance

```bash
# From app instance, test connection
# Replace 172.31.0.46 with actual database private IP
mongosh "mongodb://wardrobe_user:wardrobe123@172.31.0.46:27017/Digital_Wardrobe"

# If this works, MongoDB connection is fine
# If it fails, there's a network or authentication issue
```

### Step 5: Update and Restart Application

If the connection string is wrong, update it:

```bash
# Edit ecosystem config
nano /home/ubuntu/digital-wardrobe/ecosystem.config.js

# Update MONGODB_URI with correct private IP
# Should be: mongodb://wardrobe_user:wardrobe123@<DB_PRIVATE_IP>:27017/Digital_Wardrobe

# Restart PM2
pm2 restart wardrobe-app --update-env
pm2 save

# Check logs
pm2 logs wardrobe-app --lines 50
```

### Step 6: Check Application Logs for Errors

```bash
# On app instance
pm2 logs wardrobe-app --lines 100 | grep -i mongo
pm2 logs wardrobe-app --lines 100 | grep -i error
```

## Quick Fix Script

Run this on app instance:

```bash
#!/bin/bash

# Get database private IP (update this)
DB_IP="172.31.0.46"  # Replace with actual IP from hostname -I on DB instance

# Update ecosystem config
cd /home/ubuntu/digital-wardrobe
sed -i "s|mongodb://wardrobe_user:wardrobe123@.*:27017/Digital_Wardrobe|mongodb://wardrobe_user:wardrobe123@${DB_IP}:27017/Digital_Wardrobe|g" ecosystem.config.js

# Restart app
pm2 restart wardrobe-app --update-env
pm2 save

# Check status
pm2 logs wardrobe-app --lines 20
```

## Common Issues

1. **Wrong Private IP**: App connecting to wrong database IP
2. **User not created**: MongoDB user doesn't exist
3. **Authentication enabled**: MongoDB requires auth but app not using credentials
4. **Security group**: Database not accessible from app instance
5. **App not restarted**: Old configuration still in use

## Verify Fix

After fixing, test:

```bash
# Health endpoint
curl http://13.235.67.50:3000/api/health

# Should show: "database": "connected"

# Test registration
curl -X POST http://13.235.67.50:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","name":"Test"}'
```





