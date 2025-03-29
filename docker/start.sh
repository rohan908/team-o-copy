#!/bin/sh

# Start the backend server in the background
cd /app
node apps/backend/src/bin/www.ts &

# Start nginx in the foreground
nginx -g "daemon off;"
