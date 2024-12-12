module.exports = {
    apps: [{
      name: 'audio-management-system',
      script: 'server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }]
  };