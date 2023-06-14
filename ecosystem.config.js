module.exports = {
  apps: [
    {
      name: 'helpdesk',
      watch: false,
      autorestart: false,
      script: './helpdesk.js',
      cron_restart: '0 8 * * *'
    }
  ]
};
