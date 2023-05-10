const path = require('path');
const dirtree = require('directory-tree');

const { FILE_STORAGE_PATH } = require('../config/api.config');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    if (!FILE_STORAGE_PATH) return callback({ response: [] });
    try {
      const cloudPath = path.normalize(FILE_STORAGE_PATH);
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
