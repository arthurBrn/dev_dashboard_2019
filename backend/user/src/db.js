const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'database_user',
  user: 'monty',
  password: 'monty',
  database: 'userdb',
});

module.exports = pool;
