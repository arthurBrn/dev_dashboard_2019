var db = require('../src/db');
var UsersRoutes = {
    loginUser: (usersRepository, callback) => {
        return db.query('SELECT * FROM usersRepository WHERE mail = ? and password = ?', [usersRepository.mail, usersRepository.password], callback);
    },
    registerUser: (usersRepository, callback) => {
        return db.query('INSERT INTO usersRepository (first_name, last_name, mail, password VALUES (?,?,?,?)', [usersRepository.firstName, usersRepository.lastName, usersRepository.mail, usersRepository.password], callback);
    },
    getUserInfo: (usersRepository, callback) => {
        return db.query('SELECT * FROM usersRepository WHERE id = ?', [usersRepository.id], callback);
    },
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
