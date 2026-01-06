#!/bin/bash
# Run these commands on the DATABASE instance

echo "=== Checking MongoDB on Database Instance ==="
echo ""

echo "1. Check MongoDB service status:"
sudo systemctl status mongod
echo ""

echo "2. Check if MongoDB is listening on port 27017:"
sudo netstat -tlnp | grep 27017
echo ""

echo "3. Check MongoDB logs (last 50 lines):"
sudo tail -50 /var/log/mongodb/mongod.log
echo ""

echo "4. Try to connect to MongoDB:"
mongosh --eval "db.adminCommand('ping')"
echo ""

echo "5. Check MongoDB users:"
mongosh admin --eval "db.getUsers()"
mongosh Digital_Wardrobe --eval "db.getUsers()"
echo ""

echo "=== If MongoDB is not running, start it: ==="
echo "sudo systemctl start mongod"
echo "sudo systemctl enable mongod"

