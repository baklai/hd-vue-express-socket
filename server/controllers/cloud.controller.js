const path = require('path');
const dirtree = require('directory-tree');

const findAll = async (req, res, next) => {
  try {
    const items = dirtree(
      path.join(__dirname, '../..', 'public', 'docs'),
      {
        extensions: /\.(md|pdf|png|txt|xls|doc|docx|zip|rar|cab|exe|msi|msu)$/,
        attributes: ['size', 'type', 'extension', 'atime', 'mtime', 'ctime', 'birthtime'],
        normalizePath: true
      },
      (item, PATH, stats) => {
        item.path = PATH.slice(PATH.indexOf('/public/'));
      },
      (item, PATH, stats) => {
        item.path = PATH.slice(PATH.indexOf('/public/'));
      }
    );

    res.status(200).json(items?.children || []);
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll };
