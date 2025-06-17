const { User } = require('../database/models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'subscriptionStatus',
            'githubLink',
            'linkedInLink',
        ]
        })

        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
}

module.exports = {
    getAllUsers
}