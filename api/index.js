// Vercel serverless entrypoint reusing the Express app (single export)
const app = require('../backend/app');

module.exports = app;