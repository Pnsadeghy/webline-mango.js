const express = require('express');
router = express.Router();
router.get('/', require('./controllers/users-controller').list);
module.exports = router;