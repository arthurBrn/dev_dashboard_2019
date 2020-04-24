DROP DATABASE IF EXISTS dbcrypto;
CREATE DATABASE IF NOT EXISTS dbcrypto;

USE dbcrypto;

CREATE TABLE IF NOT EXISTS graph (
	id INT AUTO_INCREMENT,
    crypto text,
	startGraph datetime,
    endGrpah datetime,
    idUser int not null,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS rate (
    id int AUTO_INCREMENT,
    crypto text,
    idUser int not null,
    PRIMARY KEY(id)
);

INSERT INTO graph (id, crypto, startGraph, endGrpah, idUser)
VALUES(1, 'bitcoin', '2018-01-01 00:00:00.000', '2020-01-01 00:00:00.000', 1);

INSERT INTO rate (crypto, idUser) 
VALUES('bitcoin', 1);