CREATE DATABASE complab;

USE complab;

CREATE TABLE patient (
    id          INTEGER         AUTO_INCREMENT,
    name        VARCHAR(100)    DEFAULT NULL,
    dateofbirth DATE            DEFAULT NULL,

    PRIMARY KEY (id)
);
