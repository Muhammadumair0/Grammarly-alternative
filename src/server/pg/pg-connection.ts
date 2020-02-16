const pgp = require('pg-promise')();

const cn = {
    host: 'ec2-34-192-30-15.compute-1.amazonaws.com',
    port: 5432,
    database: 'd1j134osajc9pe',
    user: 'ncidljgeqeyytr',
    password: '58068161f57eb70bfb75e9a8653aec6d8ff751b242d0fb25b1c4889c44dfc923',   
    ssl: {
        rejectUnauthorized: false,
    }
};

module.exports =  pgp(cn);
