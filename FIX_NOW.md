# Quick Fix for MongoDB Connection Issue

## The Problem
- Database instance private IP mismatch (showing 172.31.0.46 but trying to connect to 172.31.15.16)
- MongoDB might not be installed
- Connection refused error

## Solution Steps

### Step 1: Get Actual Database Private IP

On the database instance, run:
```bash
hostname -I
```

This will show the actual private IP (likely `172.31.0.46`)

### Step 2: Run MongoDB Setup

From your local machine:
```bash
cd "C:\Users\sduse\Downloads\Digital Wardrobe\ansible"
ansible-playbook -i inventory.ini setup-mongodb.yml
```

This will:
- Install MongoDB
- Configure it
- Create users
- Enable authentication

### Step 3: Update App Configuration with Correct IP

After MongoDB setup, the playbook will show the correct private IP. Update the app deployment:

```bash
# The deploy.yml should automatically get the correct IP, but verify:
ansible-playbook -i inventory.ini deploy.yml
```

### Step 4: Restart Application

SSH to app instance and restart:
```bash
ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50
pm2 restart wardrobe-app
pm2 logs wardrobe-app
```

### Step 5: Test Connection

```bash
# From app instance, test MongoDB connection
mongosh "mongodb://wardrobe_user:wardrobe123@<ACTUAL_PRIVATE_IP>:27017/Digital_Wardrobe"
```

## Quick Check Commands

### On Database Instance:
```bash
# Check private IP
hostname -I

# Check if MongoDB is installed
which mongod

# Check MongoDB status
sudo systemctl status mongod

# Check if listening
sudo netstat -tlnp | grep 27017
```

### On App Instance:
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs wardrobe-app --lines 50

# Check health
curl http://localhost:3000/api/health
```

## Expected Result

After fixing:
- MongoDB running on database instance
- App connecting to MongoDB successfully
- Health endpoint showing `"database": "connected"`
- Registration and login working

