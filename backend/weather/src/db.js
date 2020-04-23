const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'database',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
    port: '3306',
});

module.exports = pool;
