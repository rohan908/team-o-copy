const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { spawn } = require('child_process');

// Create Express server
const app = express();
const PORT = process.env.PORT || 80;
const BACKEND_PORT = process.env.BACKEND_PORT || 3001;

// Start the backend server
console.log('Starting backend server...');
const backend = spawn('node', ['apps/backend/src/bin/www.ts'], {
  env: {
    ...process.env,
    PORT: BACKEND_PORT
  }
});

backend.stdout.on('data', (data) => {
  console.log(`Backend: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`Backend error: ${data}`);
});

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Proxy API requests to the backend
app.use('/api', createProxyMiddleware({
  target: `http://localhost:${BACKEND_PORT}`,
  changeOrigin: true
}));

// All other requests go to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
