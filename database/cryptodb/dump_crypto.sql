DROP DATABASE IF EXISTS dbcrypto;
CREATE DATABASE IF NOT EXISTS dbcrypto;

USE dbcrypto;

CREATE TABLE IF NOT EXISTS graph (
	id INT AUTO_INCREMENT,
    crypto text,
	startGraph text,
    endGrpah text,
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
VALUES(1, 'bitcoin', 'Tue Apr 21 2019 01:14:26 GMT 0200 (Central European Summer Time)', 'Tue Apr 21 2020 01:14:26 GMT 0200 (Central European Summer Time)', 1);

INSERT INTO rate (crypto, idUser) VALUES
('bitcoin', 1),
('dash', 1);