#!/bin/bash

# Kemetra.org - Troubleshooting Script
# Run on your Hostinger server: sudo ./diagnose.sh

echo "=========================================="
echo "  Kemetra.org Diagnostic Tool"
echo "=========================================="
echo ""

# 1. Check DNS Resolution
echo "1. Checking DNS Resolution..."
echo "   kemetra.org:"
host kemetra.org | grep "has address" || echo "   ⚠️ DNS not resolving"
echo "   www.kemetra.org:"
host www.kemetra.org | grep "has address" || echo "   ⚠️ DNS not resolving"
echo ""

# 2. Check if container is running
echo "2. Checking Docker Container..."
if docker ps | grep -q "antiq-portal"; then
    echo "   ✓ Container is running"
    docker ps | grep antiq-portal
else
    echo "   ✗ Container is NOT running!"
fi
echo ""

# 3. Test local portal access
echo "3. Testing Portal (localhost:3002)..."
LOCAL_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002)
echo "   HTTP Code: $LOCAL_RESPONSE"
if [ "$LOCAL_RESPONSE" == "200" ] || [ "$LOCAL_RESPONSE" == "307" ]; then
    echo "   ✓ Portal responding correctly"
else
    echo "   ⚠️ Unexpected response"
fi
echo ""

# 4. Check Nginx status
echo "4. Checking Nginx..."
if systemctl is-active --quiet nginx; then
    echo "   ✓ Nginx is running"
else
    echo "   ✗ Nginx is NOT running!"
fi
echo ""

# 5. Check Nginx configuration
echo "5. Checking Nginx Configuration..."
if nginx -t 2>&1 | grep -q "successful"; then
    echo "   ✓ Configuration is valid"
else
    echo "   ✗ Configuration has errors:"
    nginx -t
fi
echo ""

# 6. Check SSL certificates
echo "6. Checking SSL Certificates..."
if [ -d /etc/letsencrypt/live/kemetra.org ]; then
    echo "   ✓ SSL certificate exists"
    certbot certificates 2>/dev/null | grep -A 5 "kemetra.org"
else
    echo "   ✗ SSL certificate NOT found"
fi
echo ""

# 7. Test domain access
echo "7. Testing Domain Access..."
echo "   http://kemetra.org:"
HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://kemetra.org 2>/dev/null || echo "000")
echo "   Response: $HTTP_RESPONSE"

echo "   https://kemetra.org:"
HTTPS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://kemetra.org 2>/dev/null || echo "000")
echo "   Response: $HTTPS_RESPONSE"

echo "   https://www.kemetra.org:"
WWW_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://www.kemetra.org 2>/dev/null || echo "000")
echo "   Response: $WWW_RESPONSE"
echo ""

# 8. View Nginx config
echo "8. Current Nginx Configuration:"
echo "   Config file: /etc/nginx/sites-available/kemetra.org"
if [ -f /etc/nginx/sites-available/kemetra.org ]; then
    echo "   --- Configuration ---"
    cat /etc/nginx/sites-available/kemetra.org | grep -A 2 "server_name"
    echo ""
    cat /etc/nginx/sites-available/kemetra.org | grep -A 1 "proxy_pass"
else
    echo "   ✗ Config file not found!"
fi
echo ""

# 9. Check recent Nginx errors
echo "9. Recent Nginx Errors (last 10 lines):"
tail -10 /var/log/nginx/error.log 2>/dev/null || echo "   No error log found"
echo ""

# 10. Summary
echo "=========================================="
echo "  DIAGNOSTIC SUMMARY"
echo "=========================================="
echo ""
echo "Container Status:  $(docker ps | grep -q antiq-portal && echo '✓ Running' || echo '✗ Not Running')"
echo "Nginx Status:      $(systemctl is-active --quiet nginx && echo '✓ Running' || echo '✗ Not Running')"
echo "SSL Certificate:   $([ -d /etc/letsencrypt/live/kemetra.org ] && echo '✓ Installed' || echo '✗ Missing')"
echo "localhost:3002:    HTTP $LOCAL_RESPONSE"
echo "kemetra.org:       HTTP $HTTP_RESPONSE, HTTPS $HTTPS_RESPONSE"
echo "www.kemetra.org:   HTTPS $WWW_RESPONSE"
echo ""

# Recommendations
echo "RECOMMENDATIONS:"
echo ""

if [ "$WWW_RESPONSE" == "000" ] || [ "$WWW_RESPONSE" == "502" ] || [ "$WWW_RESPONSE" == "503" ]; then
    echo "⚠️  www.kemetra.org is not working properly"
    echo ""
    echo "Possible causes:"
    echo "1. DNS for www subdomain not configured"
    echo "2. Nginx not configured for www subdomain"
    echo "3. Firewall blocking access"
    echo ""
    echo "Quick fixes:"
    echo "- Check DNS: host www.kemetra.org"
    echo "- Reload Nginx: sudo systemctl reload nginx"
    echo "- View Nginx logs: sudo tail -f /var/log/nginx/error.log"
fi

if docker ps | grep -q antiq-portal && [ "$LOCAL_RESPONSE" == "307" ] || [ "$LOCAL_RESPONSE" == "200" ]; then
    echo "✓ Portal is running correctly on port 3002"
fi

echo ""
