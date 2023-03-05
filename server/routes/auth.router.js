const { Router } = require('express');

const { signin, signup, signout, refresh, me } = require('../controllers/auth.controller');

const router = Router({ mergeParams: true });

router.post('/signin', signin);

router.post('/signup', signup);

router.post('/signout', signout);

router.post('/refresh', refresh);

router.get('/me', me);

module.exports = router;
