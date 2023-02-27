const { Router } = require('express');

const { signin, signout, refresh, me } = require('../controllers/auth.controller');

const router = Router({ mergeParams: true });

router.post('/login', signin);

router.delete('/logout', signout);

router.post('/refresh', refresh);

router.get('/me', me);

module.exports = router;
