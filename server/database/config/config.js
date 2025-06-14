const fs = require('fs');
const path = require('path');

const caCert = fs.readFileSync(path.join(__dirname, 'ca-certificate.crt')).toString();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        ca: caCert,
      },
    },
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        ca: caCert,
      },
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        ca: caCert,
      },
    },
  },
};
