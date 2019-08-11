const express = require('express');
const middleware = require('@app/middlewares');
router = express.Router();
router.post('/', require('./controllers/auth-controller').auth);
router.get('/', [middleware.auth], require('./controllers/auth-controller').profile);
router.post('/password', [middleware.auth], require('./controllers/auth-controller').password);
module.exports = router;