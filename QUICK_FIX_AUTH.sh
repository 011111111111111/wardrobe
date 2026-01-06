#!/bin/bash

# Quick Fix Script for Authentication Issues
# This script helps diagnose and fix common MongoDB connection issues

APP_IP="13.235.67.50"
DB_IP="3.110.114.38"
DB_PRIVATE_IP="172.31.15.16"

echo "=========================================="
echo "Digital Wardrobe - Auth Troubleshooting"
echo "=========================================="
echo ""

echo "Step 1: Check Health Endpoint"
echo "-----------------------------"
curl -s http://$APP_IP:3000/api/health | jq . || echo "Failed to connect to application"
echo ""

echo "Step 2: Check MongoDB on Database Instance"
echo "-------------------------------------------"
echo "SSH into database instance:"
echo "  ssh -i ~/.ssh/devops.pem ubuntu@$DB_IP"
echo ""
echo "Then run these commands:"
echo "  sudo systemctl status mongod"
echo "  sudo netstat -tlnp | grep 27017"
echo "  sudo tail -50 /var/log/mongodb/mongod.log"
echo ""

echo "Step 3: Check Application Logs"
echo "-------------------------------"
echo "SSH into app instance:"
echo "  ssh -i ~/.ssh/devops.pem ubuntu@$APP_IP"
echo ""
echo "Then run:"
echo "  pm2 logs wardrobe-app --lines 100"
echo "  pm2 logs wardrobe-app | grep -i mongo"
echo ""

echo "Step 4: Test MongoDB Connection"
echo "--------------------------------"
echo "From app instance, test connection:"
echo "  ssh -i ~/.ssh/devops.pem ubuntu@$APP_IP"
echo "  mongosh \"mongodb://wardrobe_user:wardrobe123@$DB_PRIVATE_IP:27017/Digital_Wardrobe\""
echo ""

echo "Step 5: Re-run MongoDB Setup (if needed)"
echo "-----------------------------------------"
echo "If MongoDB is not set up correctly, run:"
echo "  ansible-playbook -i ansible/inventory.ini ansible/setup-mongodb.yml"
echo ""

echo "Step 6: Restart Application (if needed)"
echo "----------------------------------------"
echo "SSH into app instance and restart:"
echo "  ssh -i ~/.ssh/devops.pem ubuntu@$APP_IP"
echo "  pm2 restart wardrobe-app"
echo "  pm2 logs wardrobe-app"
echo ""

echo "=========================================="
echo "For detailed troubleshooting, see:"
echo "  TROUBLESHOOT_AUTH.md"
echo "=========================================="

