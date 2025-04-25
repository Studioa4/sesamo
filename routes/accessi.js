const express = require('express');
const router = express.Router();
const { logAccesso, getAccessi } = require('../controllers/accessiController');

router.post('/', logAccesso);
router.get('/', getAccessi);

module.exports = router;