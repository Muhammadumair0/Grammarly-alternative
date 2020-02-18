const dotenv = require('dotenv');
dotenv.config();

const pgp = require('pg-promise')();

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
};

export const pgDB = pgp(cn);
