const express = require('express');
const router = express.Router();
const { createImpianto } = require('../controllers/setupController');

router.post('/', createImpianto);

module.exports = router;