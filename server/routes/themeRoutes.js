const express = require('express');
const router = express.Router();
const { getThemes, getPremiumThemes }= require('../controllers/themeController');
const { authenticate } = require('../middleware/authMiddleware');
const { requirePaidUser } = require('../middleware/authMiddleware');


router.get('/',authenticate, getThemes );
router.get('/premium',authenticate, requirePaidUser, getPremiumThemes);

module.exports = router;