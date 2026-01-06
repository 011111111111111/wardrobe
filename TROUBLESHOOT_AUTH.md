# Troubleshooting Authentication Issues

## Quick Diagnostic Steps

### 1. Check Application Logs

```bash
# SSH into app instance
ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50

# Check PM2 logs for errors
pm2 logs wardrobe-app --lines 100

# Look for MongoDB connection errors
pm2 logs wardrobe-app | grep -i mongo
```

### 2. Check Health Endpoint

```bash
# From your local machine
curl http://13.235.67.50:3000/api/health

# Should show:
# {
#   "status": "ok",
#   "services": {
#     "api": "ok",
#     "database": "connected"  # This should be "connected"
#   }
# }
```

If `database` shows `"disconnected"`, MongoDB connection is failing.

### 3. Verify MongoDB is Running

```bash
# SSH into database instance
ssh -i ~/.ssh/devops.pem ubuntu@3.110.114.38

# Check MongoDB status
sudo systemctl status mongod

# Check if MongoDB is listening
sudo netstat -tlnp | grep 27017
# Should show: tcp  0  0  0.0.0.0:27017  0.0.0.0:*  LISTEN  <pid>/mongod
```

### 4. Test MongoDB Connection from App Instance

```bash
# SSH into app instance
ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50

# Test connection (using private IP)
mongosh "mongodb://wardrobe_user:wardrobe123@172.31.15.16:27017/Digital_Wardrobe"

# If this fails, there's a connectivity or authentication issue
```

### 5. Check MongoDB Authentication

```bash
# SSH into database instance
ssh -i ~/.ssh/devops.pem ubuntu@3.110.114.38

# Connect to MongoDB
mongosh

# Check if users exist
use admin
db.getUsers()

use Digital_Wardrobe
db.getUsers()

# If users don't exist, create them:
use admin
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [{ role: "root", db: "admin" }]
})

use Digital_Wardrobe
db.createUser({
  user: "wardrobe_user",
  pwd: "wardrobe123",
  roles: [{ role: "readWrite", db: "Digital_Wardrobe" }]
})
```

### 6. Check Environment Variables

```bash
# SSH into app instance
ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50

# Check PM2 environment
pm2 env 0

# Check .env file
cat /home/ubuntu/digital-wardrobe/.env.production

# Check ecosystem config
cat /home/ubuntu/digital-wardrobe/ecosystem.config.js
```

### 7. Check Security Groups

Make sure the database security group allows connections from the app security group on port 27017.

```bash
# Check security groups from AWS Console or CLI
aws ec2 describe-security-groups --group-ids <db-security-group-id>
```

## Common Issues and Solutions

### Issue 1: MongoDB Not Running

**Solution:**
```bash
# SSH into database instance
ssh -i ~/.ssh/devops.pem ubuntu@3.110.114.38

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### Issue 2: MongoDB Authentication Not Configured

**Solution:**
Run the MongoDB setup playbook again:
```bash
ansible-playbook -i inventory.ini setup-mongodb.yml
```

### Issue 3: Connection String Wrong

**Solution:**
Check the connection string in the app:
- Should use private IP: `172.31.15.16`
- Should use correct credentials: `wardrobe_user:wardrobe123`
- Should use correct database: `Digital_Wardrobe`

### Issue 4: Security Group Not Allowing Connection

**Solution:**
Check that the database security group allows port 27017 from the app security group.

### Issue 5: MongoDB Not Listening on All Interfaces

**Solution:**
```bash
# SSH into database instance
ssh -i ~/.ssh/devops.pem ubuntu@3.110.114.38

# Edit MongoDB config
sudo nano /etc/mongod.conf

# Make sure bindIp is set to 0.0.0.0:
# net:
#   port: 27017
#   bindIp: 0.0.0.0

# Restart MongoDB
sudo systemctl restart mongod
```

## Quick Fix Script

Run this script to diagnose and fix common issues:

```bash
#!/bin/bash

APP_IP="13.235.67.50"
DB_IP="3.110.114.38"
DB_PRIVATE_IP="172.31.15.16"

echo "=== Diagnostic Check ==="

echo "1. Checking health endpoint..."
curl -s http://$APP_IP:3000/api/health | jq .
echo ""

echo "2. To check MongoDB on database instance:"
echo "   ssh -i ~/.ssh/devops.pem ubuntu@$DB_IP"
echo "   sudo systemctl status mongod"
echo ""

echo "3. To check app logs:"
echo "   ssh -i ~/.ssh/devops.pem ubuntu@$APP_IP"
echo "   pm2 logs wardrobe-app --lines 50"
echo ""

echo "4. To test MongoDB connection from app:"
echo "   ssh -i ~/.ssh/devops.pem ubuntu@$APP_IP"
echo "   mongosh \"mongodb://wardrobe_user:wardrobe123@$DB_PRIVATE_IP:27017/Digital_Wardrobe\""
```

