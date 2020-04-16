const mariadb = require('mariadb');

const pool = mariadb.createPool({
    // host: '127.0.0.1',
    host: 'database',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
    port: '3306',
    //socketPath: '/var/run/mysqld/mysqld.sock'
});

module.exports = pool;