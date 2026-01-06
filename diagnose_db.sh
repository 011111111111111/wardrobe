#!/bin/bash
# Run this on the DATABASE instance to diagnose issues

echo "=== Database Instance Diagnostics ==="
echo ""

echo "1. Current instance private IP:"
hostname -I
ip addr show | grep "inet " | grep -v 127.0.0.1
echo ""

echo "2. Check if MongoDB is installed:"
which mongod
mongod --version 2>/dev/null || echo "MongoDB not installed"
echo ""

echo "3. Check MongoDB service status:"
sudo systemctl status mongod 2>/dev/null || echo "MongoDB service not found"
echo ""

echo "4. Check if port 27017 is listening:"
sudo netstat -tlnp | grep 27017 || echo "Port 27017 not listening"
echo ""

echo "5. Check MongoDB config:"
sudo cat /etc/mongod.conf 2>/dev/null || echo "MongoDB config not found"
echo ""

echo "6. Check MongoDB logs:"
sudo tail -20 /var/log/mongodb/mongod.log 2>/dev/null || echo "MongoDB logs not found"
echo ""

echo "=== Next Steps ==="
echo "If MongoDB is not installed, run from your local machine:"
echo "  cd ansible"
echo "  ansible-playbook -i inventory.ini setup-mongodb.yml"

