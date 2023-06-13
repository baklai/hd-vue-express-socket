module.exports = {
  apps: [
    {
      name: 'helpdesk',
      script: 'chcp 65001 && node ./server/index.js',
      watch: false,
      autorestart: false
    }
  ]
};
