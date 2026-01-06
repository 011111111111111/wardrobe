#!/bin/bash
# Steps to fix MongoDB connection issue

echo "=== Step 1: Get actual database instance private IP ==="
echo "Run on database instance:"
echo "  hostname -I"
echo "  ip addr show | grep 'inet ' | grep -v 127.0.0.1"
echo ""

echo "=== Step 2: Check if MongoDB is installed ==="
echo "Run on database instance:"
echo "  which mongod"
echo "  sudo systemctl status mongod"
echo ""

echo "=== Step 3: If MongoDB is not installed, run setup ==="
echo "From your local machine:"
echo "  cd ansible"
echo "  ansible-playbook -i inventory.ini setup-mongodb.yml"
echo ""

echo "=== Step 4: Update connection string in app ==="
echo "After getting the correct private IP, update:"
echo "  1. ansible/deploy.yml - MongoDB connection string"
echo "  2. Restart the application"
echo ""

echo "=== Step 5: Test connection from app instance ==="
echo "SSH to app instance and test:"
echo "  ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50"
echo "  mongosh 'mongodb://wardrobe_user:wardrobe123@<ACTUAL_DB_PRIVATE_IP>:27017/Digital_Wardrobe'"

