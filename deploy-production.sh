#!/bin/bash

# Kemetra.org Portal - Manual Production Deployment Script
# Run this on your Hostinger server: ./deploy-production.sh

set -e

echo "=========================================="
echo "  Kemetra Portal Production Deployment"
echo "=========================================="
echo ""

# Step 1: Pull latest changes
echo "Step 1: Pulling latest changes from Git..."
git pull origin main || git pull origin master
echo "✓ Git pull complete"
echo ""

# Step 2: Stop running containers
echo "Step 2: Stopping existing containers..."
docker compose down
echo "✓ Containers stopped"
echo ""

# Step 3: Remove old images (optional - saves space)
echo "Step 3: Cleaning up old Docker images..."
docker image prune -f
echo "✓ Cleanup complete"
echo ""

# Step 4: Build new image
echo "Step 4: Building Docker image..."
docker compose build --no-cache
echo "✓ Build complete"
echo ""

# Step 5: Start container
echo "Step 5: Starting container..."
docker compose up -d
echo "✓ Container started"
echo ""

# Step 6: Wait for container to be healthy
echo "Step 6: Waiting for application to start (30 seconds)..."
sleep 30
echo "✓ Wait complete"
echo ""

# Step 7: Check container status
echo "Step 7: Verifying deployment..."
if docker ps | grep -q "antiq-portal"; then
    echo "✓ Container is running"
    
    # Test if app is responding
    echo "Testing application response..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 | grep -q "200\|307\|301"; then
        echo "✓ Application is responding"
    else
        echo "⚠ Warning: Application may not be ready yet"
        echo "Check logs with: docker logs antiq-portal"
    fi
else
    echo "✗ ERROR: Container is not running!"
    echo "View logs with: docker logs antiq-portal"
    exit 1
fi
echo ""

# Step 8: Show container info
echo "Step 8: Container Information"
docker ps | grep antiq-portal || echo "Container not found"
echo ""

echo "=========================================="
echo "  ✓ DEPLOYMENT COMPLETE"
echo "=========================================="
echo ""
echo "Access your portal at:"
echo "  → http://153.92.209.167:3002"
echo "  → https://kemetra.org (if Nginx is configured)"
echo ""
echo "Useful commands:"
echo "  View logs:    docker logs -f antiq-portal"
echo "  Restart:      docker compose restart"
echo "  Stop:         docker compose down"
echo ""
