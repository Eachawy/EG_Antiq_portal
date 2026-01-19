#!/bin/bash

# EG Antiq Portal - Local Docker Deployment Script

set -e

echo "🚀 Starting EG Antiq Portal Docker Deployment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running${NC}"
    echo "Please start Docker and try again"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Check if backend network exists
if ! docker network inspect eg_antiq_app-network > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Backend network 'eg_antiq_app-network' not found${NC}"
    echo "Please make sure the backend API is running first"
    exit 1
fi

echo -e "${GREEN}✅ Backend network exists${NC}"
echo ""

# Stop and remove existing container if it exists
if docker ps -a --format '{{.Names}}' | grep -q '^antiq-portal$'; then
    echo -e "${YELLOW}🔄 Stopping existing container...${NC}"
    docker-compose down
    echo ""
fi

# Build the Docker image
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
echo "This may take a few minutes..."
docker-compose build --no-cache

echo ""
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Start the container
echo -e "${YELLOW}🚀 Starting container...${NC}"
docker-compose up -d

echo ""
echo -e "${GREEN}✅ Container started${NC}"
echo ""

# Wait for health check
echo -e "${YELLOW}⏳ Waiting for portal to be ready...${NC}"
sleep 5

# Check container status
if docker ps --format '{{.Names}}' | grep -q '^antiq-portal$'; then
    echo -e "${GREEN}✅ Portal is running!${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}🎉 Deployment Successful!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📱 Portal URL: http://localhost:3002"
    echo "🔗 Backend API: http://localhost:3000/api/v1"
    echo ""
    echo "📊 View logs: docker logs -f antiq-portal"
    echo "🛑 Stop: docker-compose down"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo -e "${RED}❌ Error: Container failed to start${NC}"
    echo ""
    echo "View logs with: docker logs antiq-portal"
    exit 1
fi
