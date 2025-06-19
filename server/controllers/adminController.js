const { User } = require('../database/models');
const { Theme } = require('../database/models/theme');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()

        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
}
const createTheme = async (req, res) => {
    const { name, fontFamily, colors, isPremium } = req.body;
    try {
        const theme = await Theme.create({ name, fontFamily, colors, isPremium });

        res.status(201).json(theme)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create theme', error: error.message });
    }
}

const deleteTheme = async (req, res) => {
    const { id } = req.params;
    try {
        const theme = await Theme.findByPk(id)
        if (!theme) return res.status(404).json({ message: 'Theme not found' });
        await theme.destroy();

        res.status(200).json({ message: 'Theme has been successfully deleted' });
    } catch (error) {
        
    }
}

module.exports = {
    getAllUsers,
    createTheme,
    deleteTheme,
}