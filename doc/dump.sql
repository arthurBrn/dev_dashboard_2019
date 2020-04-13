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
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS user_has_widget(
	users_id INT NOT NULL,
	widget_id INT NOT NULL,
	PRIMARY KEY(users_id, widget_id),
	FOREIGN KEY(users_id) REFERENCES users(id),
	FOREIGN KEY(widget_id) REFERENCES widget(id)
);

CREATE TABLE service_has_widget(
	service_id INT NOT NULL,
	widget_id INT NOT NULL,
	PRIMARY KEY(service_id, widget_id),
	FOREIGN KEY(service_id) REFERENCES service(id),
	FOREIGN KEY(widget_id) REFERENCES widget(id)
);

INSERT INTO dashboard.users (first_name, last_name, mail, password) VALUES
('arthur', 'baron', 'baron@gmail.com', 'baronpwd'),
('some', 'user', 'someuser@gmail.com', 'someuserpwd');
INSERT INTO dashboard.widget (name) VALUES
('Widget n°1'),
('Widget n°2'),
('Widget n°3');
INSERT INTO dashboard.service (name, api_link) VALUES
('service n°1', 'some link'),
('service n°2', 'some link'),
('service n°3', 'some link');
INSERT INTO dashboard.user_has_widget (users_id, widget_id) VALUES
(1,1),
(2,2);
INSERT INTO dashboard.service_has_widget (service_id, widget_id) VALUES
(1,1),
(2,2);
