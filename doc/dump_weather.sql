DROP DATABASE IF EXISTS weatherdb;
CREATE DATABASE IF NOT EXISTS weatherdb;

USE weatherdb;

CREATE TABLE IF NOT EXISTS airqualityforecast(
    id INT AUTO_INCREMENT,
    city TEXT,
    country TEXT,
    api_key TEXT,
    PRIMARY KEY(id)
);
INSERT INTO airqualityforecast(city, country, api_key) VALUES
('Nantes', 'France', 'bf7db86c6d914d98a96c39416c8c595d'),
('Paris', 'France', 'bf7db86c6d914d98a96c39416c8c595d');

CREATE TABLE IF NOT EXISTS  airqualitycurrent(
    id INT AUTO_INCREMENT,
    city TEXT,
    country TEXT,
    api_key TEXT,
    PRIMARY KEY(id)
);
INSERT INTO airqualitycurrent(city, country, api_key) VALUES
('Nantes', 'France', 'bf7db86c6d914d98a96c39416c8c595d'),
('Paris', 'France', 'bf7db86c6d914d98a96c39416c8c595d');

CREATE TABLE IF NOT EXISTS weatherforecast(
    id INT AUTO_INCREMENT,
    city TEXT,
    country TEXT,
    api_key TEXT,
    PRIMARY KEY(id)
);
INSERT INTO weatherforecast(city, country, api_key) VALUES
('Nantes', 'France', 'bf7db86c6d914d98a96c39416c8c595d'),
('Paris', 'France', 'bf7db86c6d914d98a96c39416c8c595d');

CREATE TABLE IF NOT EXISTS weathercurrent(
    id INT AUTO_INCREMENT,
    city TEXT,
    hours INT,
    api_key TEXT,
    PRIMARY KEY(id)
);
INSERT INTO weathercurrent(city, hours, api_key) VALUES
('Nantes', 2, 'bf7db86c6d914d98a96c39416c8c595d'),
('Paris', 3, 'bf7db86c6d914d98a96c39416c8c595d');

