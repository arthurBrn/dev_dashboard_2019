const mariadb = require('mariadb/callback');

const conn = mariadb.createConnection({
    host: 'database',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
    port: '3306',
});

conn.connect(err => {
    if (err) {
        console.log('Database connection in db.js failed.');
    } else {
        console.log('Database connection established.');
    }
});

module.exports = conn;
