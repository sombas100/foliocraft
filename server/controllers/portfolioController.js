const { User, Theme, Portfolio } = require('../database/models');

const getMyPortfolio = async (req, res) => {
    const userId = req.user.id;
    try {
        const portfolio = await Portfolio.findOne({ 
            where: { userId },
            include: [Theme]
         });

         res.status(200).json(portfolio)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getPublicPortfolio = async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ where: { username }});
        if (!user) return res.status(404).json({ message: 'User not found' });

        const portfolio = await Portfolio.findOne({ where: { userId: user.id }, include: [Theme]});

        res.status(200).json({ user , portfolio })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const createPortfolio = async (req, res) => {
    const { title, about, skills, projects, themeId } = req.body;
    const userId = req.user.id

    try {
        const existingPortfolio = await Portfolio.findOne({ where: { userId }});
        if (existingPortfolio) return res.status(400).json({ message: 'Portfolio already exists. Please use update.'})
        
        const portfolio = await Portfolio.create({
            userId,
            title,
            about,
            skills,
            projects,
            themeId
        })
        res.status(201).json(portfolio)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const updatePortfolio = async (req, res) => {
    const { title, about, skills, projects, themeId } = req.body;
    const { id } = req.params
    const userId = req.user.id;

    try {
        const portfolio = await Portfolio.findOne({ 
            where: { id },
            userId
        })
        if (!portfolio) return res.status(404).json({ message: 'Portfolio does not exist' });

        await portfolio.update({
            title,
            about,
            skills,
            projects,
            themeId
        })
        res.status(200).json(portfolio)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const deletePortfolio = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const portfolio = await Portfolio.findOne({ where: { id }});
        if (!portfolio) return res.status(404).json({ message: 'Portfolio does not exist' });

        if (portfolio.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized. User id does not match the creators.'})
        }
        await portfolio.destroy();
        res.json({ message: 'Portfolio successfully deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    getMyPortfolio,
    getPublicPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
}