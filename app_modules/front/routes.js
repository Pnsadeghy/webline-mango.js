const express = require('express');
router = express.Router();
router.get('/', require('./controllers/pages-controller').index);
module.exports = router;