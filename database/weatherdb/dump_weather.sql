DROP DATABASE IF EXISTS weatherdb;
CREATE DATABASE IF NOT EXISTS weatherdb;

USE weatherdb;

CREATE TABLE IF NOT EXISTS airqualityforecast(
    id INT AUTO_INCREMENT,
    city TEXT,
    country TEXT,
    api_key TEXT,
    idUser INT,
    PRIMARY KEY(id)
);
INSERT INTO airqualityforecast(city, country, api_key, idUser) VALUES
('Nantes', 'France', 'bf7db86c6d914d98a96c39416c8c595d', 1),
('Paris', 'France', 'bf7db86c6d914d98a96c39416c8c595d', 1);

CREATE TABLE IF NOT EXISTS  airqualitycurrent(
    id INT AUTO_INCREMENT,
    city TEXT,
    country TEXT,
    api_key TEXT,
    idUser INT,
    PRIMARY KEY(id)
);
INSERT INTO airqualitycurrent(city, country, api_key, idUser) VALUES
('Nantes', 'France', 'bf7db86c6d914d98a96c39416c8c595d', 1),
('Paris', 'France', 'bf7db86c6d914d98a96c39416c8c595d', 1);

CREATE TABLE IF NOT EXISTS weatherforecast(
    id INT AUTO_INCREMENT,
    city TEXT,
    country TEXT,
    api_key TEXT,
    idUser INT,
    PRIMARY KEY(id)
);
INSERT INTO weatherforecast(city, country, api_key, idUser) VALUES
('Nantes', 'France', 'bf7db86c6d914d98a96c39416c8c595d', 1),
('Paris', 'France', 'bf7db86c6d914d98a96c39416c8c595d', 1);


