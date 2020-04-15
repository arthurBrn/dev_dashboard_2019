var db = require('../src/db');
var UsersRoutes = {
    loginUser: (user, callback) => {
        return db.query(
            'SELECT * FROM user WHERE mail = ? and password = ?',
            [user.mail, user.password]);
    },
    registerUser: (user, callback) => {
        return db.query('INSERT INTO user (first_name, last_name, mail, password VALUES (?,?,?,?)', [user.firstName, user.lastName, user.mail, user.password], callback);
    },
    getUserInfo: (user, callback) => {
        return db.query('SELECT * FROM users WHERE id = ?', [user.id], callback);
    },
    getAllUsers: (callback) => {
        return db.query(
            "SELECT * FROM users", [], callback
        );
    }
}
module.exports = UsersRoutes;

/*
const db = require('../src/db');
class usersRepository {
    UsersRoutes = {
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
}
module.exports = new usersRepository();

 */
