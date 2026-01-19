#!/bin/bash

# Kemetra.org Portal - Deployment Fix Script
# Run this script on your Hostinger server

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Kemetra Portal Deployment Fix        ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo ""

# 1. Check if running on server
echo -e "${YELLOW}[1/7] Checking server environment...${NC}"
SERVER_IP=$(curl -s ifconfig.me || echo "unknown")
echo "   Server IP: $SERVER_IP"
echo ""

# 2. Verify Docker Compose file
echo -e "${YELLOW}[2/7] Verifying docker-compose.yml...${NC}"
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}   ✗ docker-compose.yml not found!${NC}"
    exit 1
fi

# Check port mapping
PORT_MAPPING=$(grep -A 1 "ports:" docker-compose.yml | grep -o "[0-9]*:[0-9]*" || echo "")
echo "   Current port mapping: $PORT_MAPPING"

if [[ "$PORT_MAPPING" != "3002:3000" ]]; then
    echo -e "${RED}   ✗ INCORRECT PORT MAPPING DETECTED!${NC}"
    echo -e "${YELLOW}   Fixing port mapping to 3002:3000...${NC}"
    sed -i 's/"[0-9]*:[0-9]*"/"3002:3000"/' docker-compose.yml
    echo -e "${GREEN}   ✓ Port mapping corrected${NC}"
else
    echo -e "${GREEN}   ✓ Port mapping is correct (3002:3000)${NC}"
fi
echo ""

# 3. Stop existing containers
echo -e "${YELLOW}[3/7] Stopping existing containers...${NC}"
docker compose down 2>/dev/null || echo "   No containers to stop"
echo ""

# 4. Rebuild and start
echo -e "${YELLOW}[4/7] Building and starting container...${NC}"
docker compose up -d --build --remove-orphans
echo ""

# 5. Wait for container to be healthy
echo -e "${YELLOW}[5/7] Waiting for container to be ready...${NC}"
sleep 10

# Check if container is running
if docker ps --format '{{.Names}}' | grep -q "^antiq-portal$"; then
    echo -e "${GREEN}   ✓ Container is running${NC}"
    
    # Test internal connection
    echo -e "${YELLOW}   Testing internal connection...${NC}"
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 | grep -q "307\|200\|301"; then
        echo -e "${GREEN}   ✓ Application is responding on port 3002${NC}"
    else
        echo -e "${RED}   ✗ Application not responding on port 3002${NC}"
        echo "   Checking logs..."
        docker logs --tail 20 antiq-portal
    fi
else
    echo -e "${RED}   ✗ Container failed to start${NC}"
    docker ps -a | grep antiq-portal
    exit 1
fi
echo ""

# 6. Check firewall
echo -e "${YELLOW}[6/7] Checking firewall configuration...${NC}"
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status | grep 3002 || echo "not configured")
    if [[ "$UFW_STATUS" == "not configured" ]]; then
        echo -e "${YELLOW}   Port 3002 not open in firewall${NC}"
        echo -e "${YELLOW}   Opening port 3002...${NC}"
        sudo ufw allow 3002/tcp
        echo -e "${GREEN}   ✓ Port 3002 opened${NC}"
    else
        echo -e "${GREEN}   ✓ Port 3002 is open${NC}"
    fi
elif command -v firewall-cmd &> /dev/null; then
    echo -e "${YELLOW}   Opening port 3002 in firewalld...${NC}"
    sudo firewall-cmd --permanent --add-port=3002/tcp
    sudo firewall-cmd --reload
    echo -e "${GREEN}   ✓ Port 3002 opened${NC}"
else
    echo -e "${YELLOW}   ⚠ No firewall detected (ufw/firewalld)${NC}"
    echo -e "${YELLOW}   You may need to open port 3002 in Hostinger control panel${NC}"
fi
echo ""

# 7. Nginx configuration
echo -e "${YELLOW}[7/7] Checking Nginx configuration...${NC}"
if command -v nginx &> /dev/null; then
    # Check if kemetra.org config exists
    if [ -f "/etc/nginx/sites-available/kemetra.org" ] || [ -f "/etc/nginx/conf.d/kemetra.org.conf" ]; then
        echo -e "${GREEN}   ✓ Nginx config for kemetra.org exists${NC}"
        
        # Check if it proxies to port 3002
        if sudo nginx -T 2>/dev/null | grep -q "proxy_pass.*localhost:3002"; then
            echo -e "${GREEN}   ✓ Nginx is configured to proxy to port 3002${NC}"
        else
            echo -e "${RED}   ✗ Nginx is NOT proxying to port 3002${NC}"
            echo -e "${YELLOW}   Please update your Nginx config to include:${NC}"
            echo ""
            echo "   location / {"
            echo "       proxy_pass http://localhost:3002;"
            echo "       proxy_http_version 1.1;"
            echo "       proxy_set_header Upgrade \$http_upgrade;"
            echo "       proxy_set_header Connection 'upgrade';"
            echo "       proxy_set_header Host \$host;"
            echo "       proxy_cache_bypass \$http_upgrade;"
            echo "   }"
        fi
    else
        echo -e "${RED}   ✗ No Nginx config found for kemetra.org${NC}"
        echo -e "${YELLOW}   Creating Nginx configuration...${NC}"
        cat > /tmp/kemetra.conf << 'EOF'
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
EOF
        echo -e "${GREEN}   ✓ Nginx config created at /tmp/kemetra.conf${NC}"
        echo -e "${YELLOW}   Run these commands to apply:${NC}"
        echo "   sudo cp /tmp/kemetra.conf /etc/nginx/sites-available/kemetra.org"
        echo "   sudo ln -s /etc/nginx/sites-available/kemetra.org /etc/nginx/sites-enabled/"
        echo "   sudo nginx -t"
        echo "   sudo systemctl reload nginx"
        echo "   sudo certbot --nginx -d kemetra.org -d www.kemetra.org"
    fi
else
    echo -e "${YELLOW}   ⚠ Nginx not installed${NC}"
    echo -e "${YELLOW}   Install with: sudo apt install nginx certbot python3-certbot-nginx${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║            DEPLOYMENT STATUS           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo -e "${GREEN}✓ Container: Running on port 3002${NC}"
echo -e "${GREEN}✓ Direct Access: http://$SERVER_IP:3002${NC}"
echo ""
echo -e "${YELLOW}Next Steps for HTTPS (kemetra.org):${NC}"
echo "1. Ensure Nginx is configured (see messages above)"
echo "2. Restart Nginx: sudo systemctl restart nginx"
echo "3. Setup SSL: sudo certbot --nginx -d kemetra.org"
echo ""
echo -e "${BLUE}Useful Commands:${NC}"
echo "  View logs:     docker logs -f antiq-portal"
echo "  Restart:       docker compose restart"
echo "  Stop:          docker compose down"
echo ""
