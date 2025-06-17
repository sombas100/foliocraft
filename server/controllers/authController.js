require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../database/models');


const register = async (req, res) => {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isAdmin
        })


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d'})
        res.status(200).json({ token, user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            subscriptionStatus: user.subscriptionStatus,
            profileImage: user.profileImage,
            githubLink: user.githubLink,
            linkedInLink: user.linkedInLink,
            isAdmin: user.isAdmin
        } })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}



module.exports = {
    register,
    login,
}