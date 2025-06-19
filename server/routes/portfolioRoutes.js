const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

const { getMyPortfolio, 
    getPublicPortfolio, 
    createPortfolio, 
    updatePortfolio, 
    deletePortfolio 
} = require('../controllers/portfolioController');

router.get('/me', authenticate, getMyPortfolio);
router.post('/', authenticate, createPortfolio);
router.put('/:id', authenticate, updatePortfolio);
router.delete('/:id', authenticate, deletePortfolio);

router.get('/:username', getPublicPortfolio);

module.exports = router;