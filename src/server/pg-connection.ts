const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'Muhammad Umair Khan',
    user: 'postgres',
    password: 'Qw4hd354495110'
};

const db = pgp(cn);
