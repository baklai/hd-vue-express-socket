const { Router } = require('express');

const jwtScope = require('../middleware/scope');

const { network, sysinspector, request, dashboard } = require('../controllers/statistic.controller');

const router = Router({ mergeParams: true });

router.route('/ipaddress').get(jwtScope('api:statistic:ipaddress'), network);

router.route('/inspector').get(jwtScope('api:statistic:inspector'), sysinspector);

router.route('/request').get(jwtScope('api:statistic:request'), request);

router.route('/dashboard').get(jwtScope('api:statistic:dashboard'), dashboard);

module.exports = router;
