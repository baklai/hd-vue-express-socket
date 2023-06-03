const { Router } = require('express');

const Inspector = require('../models/inspector.model');
const inspectorVBS = require('../utils/inspector');

const { PUBLIC_TOKEN } = require('../config');

const router = Router({ mergeParams: true });

const downloadVBS = async (req, res, next) => {
  const SERVER_API = `${req.protocol}://${req.get('host')}`;
  const vbs = inspectorVBS({ routeOrigin: SERVER_API, publicToken: PUBLIC_TOKEN });
  res.setHeader('Content-Type', 'application/vbs');
  res.setHeader('Content-Disposition', 'attachment; filename=inspector.vbs');
  res.send(Buffer.from(vbs));
  res.end();
};

const createReport = async (req, res, next) => {
  try {
    if (req.headers['authorization'].toLowerCase() !== PUBLIC_TOKEN.toLowerCase()) {
      return res.status(403).end();
    }

    const ipaddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace(/^.*:/, '');

    let field = null;

    switch (req.query.field) {
      case 'baseboard':
      case 'bios':
      case 'cpu':
      case 'os':
        [field] = req.body;
        break;
      case 'memorychip':
      case 'diskdrive':
      case 'netadapter':
      case 'videoadapter':
      case 'display':
      case 'sound':
      case 'printer':
      case 'share':
      case 'useraccount':
      case 'useradmin':
      case 'product':
      case 'fixupdate':
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

router.route('/').get(downloadVBS).post(createReport);

module.exports = router;
