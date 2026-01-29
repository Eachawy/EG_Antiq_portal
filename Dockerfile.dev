# Development Dockerfile for Portal Frontend
# Purpose: Local development with hot reload and debugging

FROM node:20-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nextjs && \
    adduser -u 1001 -S nextjs -G nextjs

# Copy package files
COPY --chown=nextjs:nextjs package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci --legacy-peer-deps

# Copy application source
COPY --chown=nextjs:nextjs . .

# Set environment
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# Switch to non-root user
USER nextjs

# Expose Next.js dev server port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start Next.js dev server with hot reload
CMD ["npm", "run", "dev", "--", "-p", "3000"]
