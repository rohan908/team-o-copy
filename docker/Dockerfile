# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and Yarn configuration
COPY package.json yarn.lock ./
COPY .yarn .yarn
COPY .pnp.cjs .pnp.loader.mjs ./

# Copy the entire project structure for building
COPY apps apps
COPY packages packages
COPY configs configs
COPY tsconfig.json turbo.json ./

# Enable Yarn Berry
RUN corepack enable

# Install dependencies
RUN yarn install

# Generate Prisma client
RUN yarn workspace database generate

# Build the application
RUN yarn build

# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Accept build-time variables
ARG NODE_ENV
ARG BACKEND_PORT
ARG FRONTEND_PORT

# Make them available at runtime
ENV NODE_ENV=$NODE_ENV \
    BACKEND_PORT=$BACKEND_PORT \
    FRONTEND_PORT=$FRONTEND_PORT

# Copy the entire project structure
COPY --from=builder /app .

# Enable Yarn Berry for production
RUN corepack enable

# Install serve for the frontend
RUN yarn add serve

# Install nginx
RUN apk add --no-cache nginx

# Install envsubst
RUN apk add --no-cache gettext

# Copy nginx configuration
COPY docker/nginx.conf.template /etc/nginx/http.d/template

# Copy start script
COPY docker/start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Start the application
CMD ["/app/start.sh"]
