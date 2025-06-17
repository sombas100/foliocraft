require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/models/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

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