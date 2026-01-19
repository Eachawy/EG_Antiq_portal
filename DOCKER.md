# EG Antiq Portal - Docker Deployment Guide

## 📋 Prerequisites

1. **Docker Desktop** installed and running
2. **Backend API** must be running (it provides the network and API)
3. **Ports Available**:
   - Port 3002 (Portal)
   - Port 3000 (Backend API)

## 🚀 Quick Start

### Option 1: Using the Deployment Script (Recommended)

```bash
./deploy-local.sh
```

This script will:
- ✅ Check if Docker is running
- ✅ Check if backend network exists
- ✅ Stop any existing container
- ✅ Build the Docker image
- ✅ Start the container
- ✅ Verify it's running

### Option 2: Manual Deployment

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up -d

# View logs
docker logs -f antiq-portal
```

## 🔧 Configuration

### Environment Variables

The portal uses `.env.production` for Docker deployment:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
NODE_ENV=production
```

### Ports

- **Container Internal Port**: 3000
- **Host External Port**: 3002
- **Access URL**: http://localhost:3002

## 📊 Management Commands

```bash
# View logs
docker logs -f antiq-portal

# Stop the portal
docker-compose down

# Restart the portal
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Check status
docker ps | grep antiq-portal

# Access container shell
docker exec -it antiq-portal sh
```

## 🌐 Network Configuration

The portal connects to the backend via the `eg_antiq_app-network` Docker network. This allows:
- Container-to-container communication
- Shared network with backend API
- Proper DNS resolution

## 🐛 Troubleshooting

### Portal won't start

```bash
# Check logs
docker logs antiq-portal

# Check if port 3002 is available
lsof -i :3002

# Check if backend network exists
docker network ls | grep antiq
```

### Can't connect to backend API

1. Make sure backend is running:
   ```bash
   curl http://localhost:3000/api/v1/health
   ```

2. Check if portal is on the right network:
   ```bash
   docker inspect antiq-portal | grep Networks -A 5
   ```

### Build issues

```bash
# Clean build (no cache)
docker-compose build --no-cache

# Remove old images
docker image prune -a
```

## 🔄 Updating the Portal

When you make code changes:

```bash
# Rebuild and restart
docker-compose up -d --build

# Or use the deployment script
./deploy-local.sh
```

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Browser (http://localhost:3002)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Portal Container (antiq-portal)    │
│  - Next.js App (Port 3000 internal) │
│  - Mapped to host Port 3002         │
└──────────────┬──────────────────────┘
               │
               │ eg_antiq_app-network
               │
               ▼
┌─────────────────────────────────────┐
│  Backend API (backend-api)          │
│  - NestJS API (Port 3000)           │
│  - Database, Redis, etc.            │
└─────────────────────────────────────┘
```

## 📝 Notes

- The portal is a **static/client-side** Next.js app
- API calls are made from the **browser** to `http://localhost:3000/api/v1`
- The Docker container only serves the built static files
- OAuth redirects work because they use the browser's origin

## 🆘 Support

If you encounter issues:
1. Check the logs: `docker logs antiq-portal`
2. Verify backend is running: `curl http://localhost:3000/api/v1/health`
3. Check network: `docker network inspect eg_antiq_app-network`
