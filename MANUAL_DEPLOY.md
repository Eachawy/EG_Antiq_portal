# Manual Production Deployment - Step by Step

Run these commands **one by one** on your Hostinger server:

## Option 1: Use the Automated Script

```bash
cd ~/EG_Antiq_portal
git pull
chmod +x deploy-production.sh
./deploy-production.sh
```

---

## Option 2: Manual Commands (if script fails)

### 1. Navigate to project directory
```bash
cd ~/EG_Antiq_portal
```

### 2. Pull latest code
```bash
git pull
```

### 3. Stop existing containers
```bash
docker compose down
```

### 4. Remove old images (optional)
```bash
docker image prune -f
```

### 5. Build the application
```bash
docker compose build --no-cache
```

### 6. Start the container
```bash
docker compose up -d
```

### 7. Check container status
```bash
docker ps
```

### 8. View logs (if needed)
```bash
docker logs -f antiq-portal
```
Press `Ctrl+C` to exit logs

### 9. Test the application
```bash
curl http://localhost:3002
```

---

## Verify Deployment

After deployment, test these URLs:

1. **From the server:**
   ```bash
   curl -I http://localhost:3002
   ```
   Should return `HTTP/1.1 307` or `200 OK`

2. **From your browser:**
   - Direct IP: http://153.92.209.167:3002
   - Domain: https://kemetra.org (if Nginx configured)

---

## If Port is Already in Use

```bash
# Find what's using port 3002
sudo lsof -i :3002

# Kill the process (replace PID with actual process ID)
sudo kill -9 PID

# Or force remove the container
docker rm -f antiq-portal

# Then redeploy
docker compose up -d --build
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `docker compose up -d --build` | Build and start |
| `docker compose down` | Stop containers |
| `docker compose restart` | Restart |
| `docker logs antiq-portal` | View logs |
| `docker ps` | List running containers |
| `docker exec -it antiq-portal sh` | Shell into container |

---

## Troubleshooting

### Container keeps restarting?
```bash
docker logs antiq-portal
```
Look for error messages

### Can't access on port 3002?
1. Check if container is running: `docker ps`
2. Check port mapping: `docker port antiq-portal`
3. Check firewall: `sudo ufw status`
4. Test locally: `curl http://localhost:3002`

### Need to rebuild completely?
```bash
docker compose down
docker system prune -a
docker compose up -d --build
```
