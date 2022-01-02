/**
 * Reading Environment Variables
 */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  database: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: process.env.DATABASE_NAME || 'dblinks',
  },
  port: process.env.PORT || 4000,
};
