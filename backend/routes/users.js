var db = require('../src/db');

var UsersRoutes = {
    loginUser: (users, callback) => {
        return db.query('SELECT * FROM users WHERE mail = ? and password = ?', [users.mail, users.password], callback);
    },
    registerUser: (users, callback) => {
        return db.query('INSERT INTO users (first_name, last_name, mail, password VALUES (?,?,?,?)', [users.firstName, users.lastName, users.mail, users.password], callback);
    },
    getUserInfo: (users, callback) => {
        return db.query('SELECT * FROM users WHERE id = ?', [users.id], callback);
    },
}

module.exports = UsersRoutes;
