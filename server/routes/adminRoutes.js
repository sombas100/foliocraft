const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/authMiddleware');
const { authenticate } = require('../middleware/authMiddleware');
const { getAllUsers, createTheme, deleteTheme } = require('../controllers/adminController')

router.use(authenticate, requireAdmin);

router.get('/users', getAllUsers)
router.post('/themes', createTheme);
router.delete('/themes/:id', deleteTheme);

module.exports = router;