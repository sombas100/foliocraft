const { Theme } = require('../database/models');

const getThemes = async (req, res) => {
    const subscriptionStatus = req.user.subscriptionStatus
    try {
        const isPaid = subscriptionStatus = 'PAID';

        const themes = await Theme.findAll({ where: isPaid ? {} : { isPremium: false }})

        res.json(themes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    getThemes
}