const mariadb = require('mariadb');

const pool = mariadb.createPool({
    database: 'dashboard',
    host: '127.0.0.1',
    port: '3306',
    user: 'monty',
    password: 'monty'
});
