const { Router } = require('express');

const jwtScope = require('../middleware/scope');

const { findAll } = require('../controllers/cloud.controller');

const router = Router({ mergeParams: true });

router.route('/').get(jwtScope('api:cloud:find:all'), findAll);

module.exports = router;
