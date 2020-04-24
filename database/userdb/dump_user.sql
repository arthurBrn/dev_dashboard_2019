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

INSERT INTO users (id, first_name,last_name,mail,password,refresh_token) VALUES 
(1, 'Maxime','Bouchet','maxime@mail.com','$2b$10$DHv17.vvrCwZ/c9o9.FbRONoB1NxkvBG3ZV.D2HAY4DpEe1ZAbntO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWFpbCI6Im1heGltZUBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJERIdjE3LnZ2ckN3Wi9jOW85LkZiUk9Ob0IxTnhrdkJHM1pWLkQySEFZNERwRWUxWkFibnRPIiwiaWF0IjoxNTg3NzQzMDk1fQ.FEFyfSdfNkDMQ1lB_4C6op8M9AEnwYOuB7bkFqTG_ok');

CREATE TABLE IF NOT EXISTS tokens (
    provider text not null,
    token text not null,
    idUser int not null,
    foreign key (idUser) references users(id)
);

INSERT INTO tokens (provider,token,idUser) VALUES 
('facebook','testtokenfb',1),
('google','testokenfb',1);

CREATE TABLE IF NOT EXISTS widget (
    id int AUTO_INCREMENT,
    name text not null,
    PRIMARY KEY(id)
);

INSERT INTO widget (name) VALUES
('graph'),
('rate');

CREATE TABLE IF NOT EXISTS services (
    id int AUTO_INCREMENT,
    label text not null,
    PRIMARY KEY(id)
);

INSERT INTO services (label) VALUES
('crypto'),
('weather');

CREATE TABLE IF NOT EXISTS user_widget (
    idWidget int not null,
    idServices int not null,
    idUser int not null,
    foreign key (idWidget) references widget(id),
    foreign key (idServices) references services(id),
    foreign key (idUser) references users(id)
);

INSERT INTO user_widget (idWidget, idServices, idUser) VALUES
(1, 1, 1),
(2, 1, 1);
