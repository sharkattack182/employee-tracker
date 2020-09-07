CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employees (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id)
);

CREATE TABLE roles (
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE departments(
id INTEGER NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30),
PRIMARY KEY(id)
);



department VARCHAR(100) NOT NULL,
salary INTEGER NOT NULL,
manager VARCHAR(100),



DROP TABLE employees;
DROP TABLE role;
DROP TABLE departments;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Gail", "Justice", 1, null),
("TJ", "Kerr", 2, null),
("Noa", "Baker", 3, 1),
("Raja", "Yoder", 4, 2),
("Tammy", "Olson", 4, 2),
("George", "Shultz", 5, 1),
("Emme", "Wicks", 5, 1);

INSERT INTO roles (title, salary, department_id)
VALUES 
("President", 100000, 1),
("Vice President", 90000, 1),
("Manager", 70000, 2),
("Manager", 70000, 3),
("Assosiate", 50000, 3),
("Manager", 70000, 4),
("Assosiate", 50000, 4);

INSERT INTO departments (dept_name)
VALUES 
("Executive"),
("HR"),
("Production"),
("Sales");



SELECT*FROM employees;
SELECT*FROM roles;
SELECT*FROM departments;
--reset the tables to fit the assignment