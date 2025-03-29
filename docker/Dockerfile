# Base Node.js image
FROM node:20.18.0-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies for the build
FROM base AS builder
COPY . .

# Install correct Yarn version
RUN corepack enable

# Install dependencies
RUN yarn install

# Build the frontend and backend
RUN yarn build

# Production image
FROM base AS production

# Copy the built applications from the builder stage
COPY --from=builder /app/apps/frontend/build /app/frontend
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps /app/apps
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/

# Environment variables
ENV NODE_ENV=production
ENV PORT=80
ENV FRONTEND_PORT=80
ENV BACKEND_PORT=3001

# Expose the port
EXPOSE 80

# Install nginx
RUN apk add --no-cache nginx

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Start nginx and backend
COPY docker/start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
