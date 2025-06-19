const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/stripeController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/create-checkout-session', authenticate, createCheckoutSession);

module.exports = router