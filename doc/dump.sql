-- CREATE DATABASE dashboard;

DROP DATABASE IF EXISTS dashboard;
CREATE DATABASE IF NOT EXISTS dashboard;

USE dashboard;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT,
	first_name varchar(255),
	last_name varchar(255),
	mail text,
	password text,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS widget(
	id INT AUTO_INCREMENT,
	name text,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS service(
	id INT AUTO_INCREMENT,
	name text,
	api_link text,
	picture text,
    public BOOL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS user_has_service(
	users_id INT NOT NULL,
	service_id INT NOT NULL,
	PRIMARY KEY(users_id, service_id),
	FOREIGN KEY(users_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(service_id) REFERENCES service(id) ON DELETE CASCADE
);

CREATE TABLE service_has_widget(
	service_id INT NOT NULL,
	widget_id INT NOT NULL,
	PRIMARY KEY(service_id, widget_id),
	FOREIGN KEY(service_id) REFERENCES service(id) ON DELETE CASCADE,
	FOREIGN KEY(widget_id) REFERENCES widget(id) ON DELETE CASCADE
);

INSERT INTO dashboard.users (first_name, last_name, mail, password) VALUES
('arthur', 'baron', 'baron@gmail.com', 'baronpwd'),
('some', 'user', 'someuser@gmail.com', 'someuserpwd'),
('Maxime','Bouchet','maxime@mail.com','$2b$10$hY9IQuYJ8v1GaGfcDLk.uOy2i6TxSVun9mD5sVNlvfLV7f12E6rjy');
INSERT INTO dashboard.widget (name) VALUES
('Widget n°1'),
('Widget n°2'),
('Widget n°3');
INSERT INTO dashboard.service (name,api_link,picture,public) VALUES 
('cryptocurrencies','https://pro-api.coinmarketcap.com/v1/','https://placetech.net/wp-content/uploads/2018/04/cryptocurrency-3085139_1280.jpg',1)
,('weather','','https://wi-images.condecdn.net/image/doEYpG6Xd87/crop/2040/f/weather.jpg',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1)
,('comming soon','','https://imageog.flaticon.com/icons/png/512/61/61457.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=CDCDCDCD',1);
INSERT INTO dashboard.user_has_service (users_id, service_id) VALUES
(1,1),
(2,2);
INSERT INTO dashboard.service_has_widget (service_id, widget_id) VALUES
(1,1),
(2,2);
