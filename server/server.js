require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/models/index');

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const themeRoutes = require('./routes/themeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const webHookRoutes = require('./routes/webhookRoutes');

app.use('/api/webhook', express.raw({ type: 'application/json' }), webHookRoutes);

app.use(express.json())
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/stripe', stripeRoutes);

const connectDb = async () => {
    console.log('Checking database connection...');

    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
    } catch (error) {
        console.log('Database connection failed', error);
        process.exit(1);
    }
}


(async () => {
    await connectDb();
    console.log('Attempting to start the server...');
    app.listen(PORT, () => console.log(`Server is now listening on PORT: ${PORT}`))
})()