# Kemetra.org Portal - Production Deployment Guide

## Quick Fix for Current Issue

### On Your Hostinger Server:

```bash
# 1. Navigate to your project directory
cd ~/path/to/EG_Antiq_portal

# 2. Pull latest changes
git pull

# 3. Run the fix script
chmod +x fix-deployment.sh
./fix-deployment.sh
```

This script will automatically:
- ✓ Fix the port mapping (3002:3000)
- ✓ Rebuild and restart the container
- ✓ Check firewall settings
- ✓ Verify Nginx configuration
- ✓ Provide next steps

---

## Manual Steps (if script doesn't work)

### 1. Verify and Fix docker-compose.yml

Make sure line 12 in `docker-compose.yml` has:
```yaml
ports:
  - "3002:3000"  # NOT 3002:8080
```

### 2. Rebuild Container

```bash
docker compose down
docker compose up -d --build
```

### 3. Test Direct Access

```bash
# Test from server
curl http://localhost:3002

# Test from outside (should work if firewall allows)
curl http://153.92.209.167:3002
```

### 4. Configure Nginx for kemetra.org

Create/edit `/etc/nginx/sites-available/kemetra.org`:

```nginx
server {
    listen 80;
    server_name kemetra.org www.kemetra.org;
    
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and test:
```bash
sudo ln -s /etc/nginx/sites-available/kemetra.org /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Setup SSL Certificate

```bash
sudo certbot --nginx -d kemetra.org -d www.kemetra.org
```

### 6. Open Firewall Port (if needed)

**UFW:**
```bash
sudo ufw allow 3002/tcp
sudo ufw reload
```

**Firewalld:**
```bash
sudo firewall-cmd --permanent --add-port=3002/tcp
sudo firewall-cmd --reload
```

**Hostinger Control Panel:**
- Go to Firewall settings
- Add rule: Allow TCP port 3002

---

## Troubleshooting

### Container won't start?
```bash
docker logs antiq-portal
```

### Port already in use?
```bash
sudo lsof -i :3002
# Kill the process or change port
```

### Domain not working but IP works?
- Check Nginx configuration
- Verify DNS points to correct IP: `dig kemetra.org`
- Check SSL certificate: `sudo certbot certificates`

### Still can't access?
1. Check Hostinger's control panel for firewall/security groups
2. Verify container health: `docker ps`
3. Test internal: `curl http://localhost:3002`
4. Test external: `curl http://153.92.209.167:3002`

---

## Architecture

```
Internet
    ↓
https://kemetra.org (Port 443)
    ↓
Nginx Reverse Proxy
    ↓
http://localhost:3002
    ↓
Docker Container (antiq-portal)
    ↓
Next.js App (Port 3000 internally)
```

---

## Useful Commands

```bash
# View container logs
docker logs -f antiq-portal

# Restart container
docker compose restart

# Stop container
docker compose down

# Rebuild from scratch
docker compose up -d --build --force-recreate

# Check Nginx status
sudo systemctl status nginx

# Test Nginx config
sudo nginx -t

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```
