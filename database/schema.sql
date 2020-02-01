DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES ("computers");

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30)  NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) 
    );

    INSERT INTO role (title, salary, department_id)
    VALUES ("Software Engineer", 20000, 1);

    INSERT INTO role (title, salary, department_id)
    VALUES ("full stack", 40000, 1);
    

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("beenish", "Butt", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ayra", "Khurram", 2, null);