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

const downloadMSI = async (req, res, next) => {
  const msi = null;
  res.setHeader('Content-Type', 'application/msi');
  res.setHeader('Content-Disposition', 'attachment; filename=inspector.msi');
  res.send(Buffer.from(msi));
  res.end();
};

const createReport = async (req, res, next) => {
  try {
    const ipaddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace(/^.*:/, '');

    let field = null;

    switch (req.query.field) {
      case 'baseboard':
        [field] = req.body;
        break;
      case 'bios':
        [field] = req.body;
        break;
      case 'os':
        [field] = req.body;
        break;
      case 'cpu':
        [field] = req.body;
        break;
      case 'memorychip':
        field = req.body;
        break;
      case 'diskdrive':
        field = req.body;
        break;
      case 'netadapter':
        field = req.body;
        break;
      case 'printer':
        field = req.body;
        break;
      case 'share':
        field = req.body;
        break;
      case 'product':
        field = req.body;
        break;
      case 'useraccount':
        field = req.body;
        break;
      case 'useradmin':
        field = req.body;
        break;
      default:
        field = null;
        break;
    }

    await Inspector.findOneAndUpdate(
      {
        host: ipaddress
      },
      {
        host: ipaddress,
        [req.query.field]: field
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

router.route('/vbs').get(downloadVBS);

router.route('/msi').get(downloadMSI);

router.route('/inspector').post(createReport);

module.exports = router;
