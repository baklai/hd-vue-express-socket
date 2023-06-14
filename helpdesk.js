if (process.platform === 'win32') {
  const { execSync } = require('child_process');
  execSync('chcp 65001');
}

require('./server/index.js');
