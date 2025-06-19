require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models/user');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token found, authorization denied.'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await user.findByPk(decoded.id)
        if (!user) return res.status(401).json({ message: 'User not found'})
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const requirePaidUser = (req, res, next) => {
    if (req.user.subscriptionStatus !== 'PAID') {
        return res.status(403).json({ message: 'This feature requires pro membership' })
    }
    next();
}

const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Unathorized. Admin only' })
    }
}

module.exports = {
    authenticate,
    requirePaidUser,
    requireAdmin
}