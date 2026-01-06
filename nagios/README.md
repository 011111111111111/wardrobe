# Nagios Monitoring Setup for Digital Wardrobe

This folder contains configuration files for monitoring the EC2 instance that hosts the Digital Wardrobe application.

## Steps to Configure
1. Install Nagios using `ansible-playbook install_nagios.yml`
2. Copy `wardrobe_host.cfg` to `/etc/nagios4/conf.d/`
3. Restart Nagios:
