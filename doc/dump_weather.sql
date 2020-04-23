DROP DATABASE IF EXISTS weatherdb;
CREATE DATABASE IF NOT EXISTS weatherdb;

USE weatherdb;

CREATE TABLE IF NOT EXISTS widget_params(
    id INT AUTO_INCREMENT,
    country TEXT,
    city TEXT,
    api_key TEXT,
    hours INT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS widget (
	id INT AUTO_INCREMENT,
	name TEXT,
	timer INT,
	user_id INT NOT NULL,
	parameters_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(parameters_id) REFERENCES widget_params(id)
);
