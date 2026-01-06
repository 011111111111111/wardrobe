module.exports = {
  /**
   * PM2 configuration for running the app on ANY server or your local machine.
   *
   * This no longer assumes an EC2 instance or a specific user/home directory.
   * - `cwd` defaults to the current project directory
   * - Logs are written to a local `logs` folder inside the project
   * - MongoDB URI defaults to a local MongoDB instance, but you can override it
   *   with the `MONGODB_URI` environment variable.
   *
   * You can still use this file with PM2 if you want process management,
   * but it's completely optional. For simple local hosting you can just run:
   *   - `npm install`
   *   - `npm run dev`  (development)
   *   - `npm run build && npm start`  (production)
   */
  apps: [
    {
      name: 'wardrobe-app',
      script: 'npm',
      args: 'start',
      // Run from the current project directory instead of a hard-coded EC2 path
      cwd: process.cwd(),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        // Default to a local MongoDB instance; override via env when needed
        MONGODB_URI:
          process.env.MONGODB_URI ||
          'mongodb://127.0.0.1:27017/digital_wardrobe',
      },
      // Store logs inside the project so this works on any machine
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};

