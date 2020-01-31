DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30)  NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30)  NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL 
    PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL
role_id INT NOT NULL
manager_id VARCHAR (30) NOT NULL
)