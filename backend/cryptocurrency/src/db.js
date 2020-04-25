const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'database_crypto',
  user: 'monty',
  password: 'monty',
  database: 'dbcrypto',
  // port: '3306',
});

module.exports = pool;
