DROP DATABASE IF EXISTS userdb;
CREATE DATABASE IF NOT EXISTS userdb;

USE userdb;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	mail TEXT,
	password TEXT,
	refresh_token TEXT,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS tokens (
    name text not null,
    token text not null,
    idUser int not null,
    foreign key (idUser) references users(id)
)
