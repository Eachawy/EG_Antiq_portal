#!/bin/bash

# EG Antiq Portal - Production Docker Deployment Script

set -e

# Configuration
APP_NAME="antiquities-frontend"
CONTAINER_NAME="antiq-portal"
PORT=3002
DOMAIN="kemetra.org"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n${YELLOW}🚀 Starting Production Deployment for $DOMAIN...${NC}\n"

# 1. Check prerequisites
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed.${NC}"
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running.${NC}"
    exit 1
fi

# 2. Pull latest changes (assuming git is used)
if [ -d ".git" ]; then
    echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
    git pull || echo -e "${RED}⚠️ Failed to pull changes. Proceeding with current files.${NC}"
fi

# 3. Build and Start with Docker Compose
echo -e "${YELLOW}🔨 Building and starting container...${NC}"
docker compose up -d --build --remove-orphans

# 4. cleanup unused images
echo -e "${YELLOW}🧹 Cleaning up unused images...${NC}"
docker image prune -f

# 5. Verify deployment
echo -e "${YELLOW}🔍 Verifying deployment...${NC}"
if docker ps --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo -e "${GREEN}✅ Container $CONTAINER_NAME is running.${NC}"
    
    # Optional: Nginx Configuration Hint
    echo -e "\n${YELLOW}ℹ️  NOTE: To serve https://$DOMAIN, ensure your Nginx configuration proxies traffic:${NC}"
    echo -e "   proxy_pass http://localhost:$PORT;"
    echo -e "\n${GREEN}🎉 Deployment Complete!${NC}"
    echo -e "🌍 App should be available internally at http://localhost:$PORT"
else
    echo -e "${RED}❌ Deployment failed. Container not running.${NC}"
    docker logs $CONTAINER_NAME
    exit 1
fi
