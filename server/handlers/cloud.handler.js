const path = require('path');
const dirtree = require('directory-tree');

const { CLOUD_PATH } = require('../config/api.config');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const cloudPath = path.normalize(CLOUD_PATH);
      const items = dirtree(
        cloudPath,
        {
          extensions: /\.(md|pdf|png|txt|xls|doc|docx|zip|rar|cab|exe|msi|msu)$/,
          attributes: ['size', 'type', 'extension', 'atime', 'mtime', 'ctime', 'birthtime'],
          normalizePath: true
        },
        (item, PATH, stats) => {
          item.path = PATH.replace(cloudPath.replaceAll('\\', '/'), '/cloud');
        },
        (item, PATH, stats) => {
          item.path = PATH.replace(cloudPath.replaceAll('\\', '/'), '/cloud');
        }
      );
      callback({ response: items?.children || [] });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('cloud:find:all', findAll);
};
