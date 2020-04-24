const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'database_weather',
    user: 'monty',
    password: 'monty',
    database: 'weatherdb',
});

module.exports = pool;
