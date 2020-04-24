FROM mariadb:latest

LABEL authors="Arthur Baron, Maxime Bouchet"

ENV MYSQL_ROOT_PASSWORD=mdp
ENV MYSQL_DATABASE=weatherdb
ENV MYSQL_USER=monty
ENV MYSQL_PASSWORD=monty

#COPY ./script/dump_user.sql /docker-entrypoint-initdb.d/dump_user.sql

USER 1000

#EXPOSE 3306

#CMD ["mysqld"]
