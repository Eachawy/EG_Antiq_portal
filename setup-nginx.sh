#!/bin/bash

# Kemetra.org - Nginx Configuration Setup Script
# Run this on your Hostinger server: sudo ./setup-nginx.sh

set -e

echo "=========================================="
echo "  Nginx Configuration for kemetra.org"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  Please run as root: sudo ./setup-nginx.sh"
    exit 1
fi

# Step 1: Check if Nginx is installed
echo "Step 1: Checking Nginx installation..."
if command -v nginx &> /dev/null; then
    echo "✓ Nginx is installed"
    nginx -v
else
    echo "✗ Nginx is not installed"
    echo "Installing Nginx..."
    apt update
    apt install -y nginx
    echo "✓ Nginx installed"
fi
echo ""

# Step 2: Create necessary directories if they don't exist
echo "Step 2: Checking Nginx directories..."
if [ ! -d /etc/nginx/sites-available ]; then
    echo "Creating /etc/nginx/sites-available..."
    mkdir -p /etc/nginx/sites-available
    echo "✓ Directory created"
fi

if [ ! -d /etc/nginx/sites-enabled ]; then
    echo "Creating /etc/nginx/sites-enabled..."
    mkdir -p /etc/nginx/sites-enabled
    echo "✓ Directory created"
fi

# Ensure sites-enabled is included in nginx.conf
if ! grep -q "sites-enabled" /etc/nginx/nginx.conf; then
    echo "Adding sites-enabled to nginx.conf..."
    sed -i '/http {/a \    include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf
    echo "✓ Updated nginx.conf"
fi
echo ""

# Step 3: Backup existing configuration (if exists)
echo "Step 3: Backing up existing configuration..."
if [ -f /etc/nginx/sites-available/kemetra.org ]; then
    cp /etc/nginx/sites-available/kemetra.org /etc/nginx/sites-available/kemetra.org.backup.$(date +%Y%m%d%H%M%S)
    echo "✓ Backup created"
else
    echo "ℹ️  No existing configuration found"
fi
echo ""

# Step 4: Create Nginx configuration
echo "Step 4: Creating Nginx configuration..."
cat > /etc/nginx/sites-available/kemetra.org << 'EOF'
# Kemetra.org Portal Configuration

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name kemetra.org www.kemetra.org;

    # Allow Certbot challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server Block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name kemetra.org www.kemetra.org;

    # SSL Configuration (will be updated by Certbot)
    # ssl_certificate /etc/letsencrypt/live/kemetra.org/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/kemetra.org/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Forward real IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files and assets
    location /_next/static/ {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_cache_valid 200 365d;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Error pages
    error_page 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/html;
    }
}
EOF
echo "✓ Configuration file created"
echo ""

# Step 5: Enable the site
echo "Step 5: Enabling site configuration..."
ln -sf /etc/nginx/sites-available/kemetra.org /etc/nginx/sites-enabled/
echo "✓ Site enabled"
echo ""

# Step 6: Remove default site if it exists and conflicts
echo "Step 6: Checking for conflicting configurations..."
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "Removing default site..."
    rm -f /etc/nginx/sites-enabled/default
    echo "✓ Default site removed"
fi
echo ""

# Step 7: Test Nginx configuration
echo "Step 7: Testing Nginx configuration..."
if nginx -t; then
    echo "✓ Configuration is valid"
else
    echo "✗ Configuration has errors!"
    echo "Restoring backup if available..."
    if [ -f /etc/nginx/sites-available/kemetra.org.backup.* ]; then
        cp /etc/nginx/sites-available/kemetra.org.backup.* /etc/nginx/sites-available/kemetra.org
    fi
    exit 1
fi
echo ""

# Step 8: Reload Nginx
echo "Step 8: Reloading Nginx..."
systemctl reload nginx
echo "✓ Nginx reloaded"
echo ""

# Step 9: Check if SSL certificate exists
echo "Step 9: Checking SSL certificate..."
if [ -d /etc/letsencrypt/live/kemetra.org ]; then
    echo "✓ SSL certificate already exists"
else
    echo "⚠️  SSL certificate NOT found"
    echo ""
    echo "To setup SSL, run:"
    echo "  sudo certbot --nginx -d kemetra.org -d www.kemetra.org"
fi
echo ""

# Step 10: Test the configuration
echo "Step 10: Testing portal access..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://kemetra.org || echo "000")
if [ "$HTTP_CODE" == "301" ] || [ "$HTTP_CODE" == "200" ]; then
    echo "✓ HTTP redirect is working (Code: $HTTP_CODE)"
else
    echo "⚠️  HTTP returned: $HTTP_CODE"
fi
echo ""

echo "=========================================="
echo "  ✓ NGINX CONFIGURATION COMPLETE"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Setup SSL certificate (if not already done):"
echo "   sudo certbot --nginx -d kemetra.org -d www.kemetra.org"
echo ""
echo "2. Test your portal:"
echo "   http://kemetra.org  (should redirect to HTTPS)"
echo "   https://kemetra.org (your portal)"
echo ""
echo "Useful commands:"
echo "  Check Nginx status:   sudo systemctl status nginx"
echo "  Reload Nginx:         sudo systemctl reload nginx"
echo "  Test config:          sudo nginx -t"
echo "  View error log:       sudo tail -f /var/log/nginx/error.log"
echo "  View access log:      sudo tail -f /var/log/nginx/access.log"
echo ""
