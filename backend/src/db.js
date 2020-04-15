const mariadb = require('mariadb');


var pool = mariadb.createPool({
    host: 'database',
    port: '3306',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
})

    /*
    .then(conn => {
    console.log('DATABASE CONNECTION ESTABLISHED.');
}).catch(err => {
    console.log(err);
});
*/


const connection = mariadb.createConnection({
    host: 'database',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
    port: '3306',
}).then(conn => {
    console.log('DATABASE CONNECTION ESTABLISHED.');
}).catch(err => {
    console.log(err);
});

/*
.then(conn => {

    console.log('DATABASE CONNECTION ESTABLISHED.');
}).catch(err => {
    console.log(err);
});

 */

module.exports = pool;
