# Quick Nginx Setup for kemetra.org

## 🚀 Automated Setup (Recommended)

**On your Hostinger server, run:**

```bash
cd ~/EG_Antiq_portal
git pull
chmod +x setup-nginx.sh
sudo ./setup-nginx.sh
```

This will automatically configure Nginx to route `kemetra.org` to your portal on port 3002.

After the script completes, run this to setup SSL:
```bash
sudo certbot --nginx -d kemetra.org -d www.kemetra.org
```

---

## 📝 Manual Setup (Alternative)

If you prefer to configure manually, follow these steps:

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/kemetra.org
```

Paste this content:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name kemetra.org www.kemetra.org;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name kemetra.org www.kemetra.org;

    # SSL will be configured by Certbot
    
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

### 2. Enable the Site

```bash
sudo ln -s /etc/nginx/sites-available/kemetra.org /etc/nginx/sites-enabled/
```

### 3. Remove Default Site (if conflicts)

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 4. Test Configuration

```bash
sudo nginx -t
```

### 5. Reload Nginx

```bash
sudo systemctl reload nginx
```

### 6. Setup SSL Certificate

```bash
sudo certbot --nginx -d kemetra.org -d www.kemetra.org
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose redirect option (recommended)

---

## ✅ Verify Setup

After configuration, test:

1. **HTTP (should redirect):**
   ```bash
   curl -I http://kemetra.org
   ```
   Should show `301 Moved Permanently`

2. **HTTPS:**
   ```bash
   curl -I https://kemetra.org
   ```
   Should show `200 OK` or `307 Temporary Redirect`

3. **Open in browser:**
   - https://kemetra.org

---

## 🔍 Troubleshooting

### Issue: "Connection refused" or "502 Bad Gateway"

**Check if portal is running:**
```bash
docker ps | grep antiq-portal
curl http://localhost:3002
```

**Check Nginx logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

### Issue: SSL certificate error

**Install Certbot:**
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

**Run Certbot:**
```bash
sudo certbot --nginx -d kemetra.org -d www.kemetra.org
```

### Issue: Port 80/443 already in use

**Find what's using the port:**
```bash
sudo lsof -i :80
sudo lsof -i :443
```

**Stop conflicting service:**
```bash
sudo systemctl stop apache2  # If Apache is running
```

### Issue: Nginx won't reload

**Check configuration:**
```bash
sudo nginx -t
```

**View the error and fix the config file**

---

## 📊 Useful Commands

```bash
# Check Nginx status
sudo systemctl status nginx

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/error.log

# View access logs
sudo tail -f /var/log/nginx/access.log

# List SSL certificates
sudo certbot certificates

# Renew SSL (auto-renewed, but can force)
sudo certbot renew
```

---

## 🏗️ Architecture After Setup

```
Browser Request
    ↓
https://kemetra.org:443
    ↓
Nginx (SSL Termination)
    ↓
http://localhost:3002
    ↓
Docker Container (antiq-portal)
    ↓
Next.js App (Port 3000)
```
