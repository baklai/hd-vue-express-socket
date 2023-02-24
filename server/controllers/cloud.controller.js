const path = require('path');
const dirtree = require('directory-tree');

const findAll = async (req, res, next) => {
    try {
        const items = dirtree(
            path.join(__dirname, '../..', 'public'),
            {
                extensions: /\.(md|pdf|png|txt|xls|doc|docx|zip|rar|cab|exe|msi|msu)$/,
                attributes: ['size', 'type', 'extension', 'atime', 'mtime', 'ctime', 'birthtime'],
                normalizePath: true
            },
            (item) => {
                item.path = item.path.slice(item.path.indexOf('/public'));
            }
        );
        callback(items?.children || []);

        res.status(200).json(items?.children || []);
    } catch (err) {
        next(err);
    }
};

module.exports = { findAll };
