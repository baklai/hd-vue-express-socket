const { Router } = require('express');

const Inspector = require('../models/inspector.model');
const inspectorVBS = require('../utils/inspector');

const router = Router({ mergeParams: true });

const downloadVBS = async (req, res, next) => {
  const SERVER_API = `${req.protocol}://${req.get('host')}`;
  const vbs = inspectorVBS(SERVER_API);
  res.setHeader('Content-Type', 'application/vbs');
  res.setHeader('Content-Disposition', 'attachment; filename=inspector.vbs');
  res.send(Buffer.from(vbs));
  res.end();
};

const createReport = async (req, res, next) => {
  try {
    const ipaddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace(/^.*:/, '');
    await Inspector.findOneAndUpdate(
      {
        host: ipaddress
      },
      {
        host: ipaddress,
        [req.query.field]:
          req.query.type === 'object' ? req.body[req.query.field][0] : req.body[req.query.field]
      },
      {
        new: true,
        upsert: true,
        rawResult: true
      }
    );
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

router.route('/inspector').get(downloadVBS).post(createReport);

module.exports = router;
