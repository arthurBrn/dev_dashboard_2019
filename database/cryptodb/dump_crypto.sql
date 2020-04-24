DROP DATABASE IF EXISTS dbcrypto;
CREATE DATABASE IF NOT EXISTS dbcrypto;

CREATE TABLE IF NOT EXISTS crypto(
	id INT AUTO_INCREMENT,
	startGraph text,
    endGrpah text,
	PRIMARY KEY(id)
);
