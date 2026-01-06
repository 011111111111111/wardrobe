# Instance Information

## Database Instance (MongoDB)
- **Public IP:** 3.110.114.38
- **Private IP:** 172.31.15.16
- **Hostname:** ec2-3-110-174-209.ap-south-1.compute.amazonaws.com
- **What to check:** MongoDB service status

## App Instance (Application)
- **Public IP:** 13.235.67.50
- **Private IP:** 172.31.4.182
- **What to check:** PM2 logs, application status

## Quick Commands

### On Database Instance (where you are now)
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check if MongoDB is listening
sudo netstat -tlnp | grep 27017

# Check MongoDB logs
sudo tail -50 /var/log/mongodb/mongod.log

# Connect to MongoDB
mongosh
```

### On App Instance (SSH to this)
```bash
# SSH to app instance
ssh -i ~/.ssh/devops.pem ubuntu@13.235.67.50

# Check PM2 status
pm2 status

# Check application logs
pm2 logs wardrobe-app --lines 100

# Check health endpoint
curl http://localhost:3000/api/health
```

