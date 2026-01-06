const app = require('./app');

const PORT = process.env.PORT || 3000;

// Local/dev server (Vercel uses the exported app via api/index.js)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

