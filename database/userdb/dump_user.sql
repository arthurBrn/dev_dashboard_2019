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
    provider text not null,
    token text not null,
    idUser int not null,
    foreign key (idUser) references users(id)
);

CREATE TABLE IF NOT EXISTS widget (
    name text not null,
    service text not null,
    idUser int not null,
    foreign key (idUser) references users(id)
);

INSERT INTO users (id, first_name,last_name,mail,password,refresh_token) VALUES 
(1, 'Maxime','Bouchet','maxime@mail.com','$2b$10$DHv17.vvrCwZ/c9o9.FbRONoB1NxkvBG3ZV.D2HAY4DpEe1ZAbntO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWFpbCI6Im1heGltZUBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJERIdjE3LnZ2ckN3Wi9jOW85LkZiUk9Ob0IxTnhrdkJHM1pWLkQySEFZNERwRWUxWkFibnRPIiwiaWF0IjoxNTg3NzQzMDk1fQ.FEFyfSdfNkDMQ1lB_4C6op8M9AEnwYOuB7bkFqTG_ok');

INSERT INTO widget (name,service,idUser) VALUES 
('graph','crypto',1),
('rate','crypto',1);

INSERT INTO tokens (provider,token,idUser) VALUES 
('facebook','testtokenfb',1);
