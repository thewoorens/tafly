const express = require('express');
const router = express.Router();
const { getServerStatus, getVersion } = require('../controllers/generalController');

router.get('/get/server-status', getServerStatus);
router.get('/get/version', getVersion);

module.exports = router;