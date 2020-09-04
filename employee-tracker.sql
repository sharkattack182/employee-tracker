CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employees (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
department VARCHAR(100) NOT NULL,
salary INTEGER NOT NULL,
manager VARCHAR(100),
PRIMARY KEY(id)
);




DROP TABLE playlist;
INSERT INTO employees (first_name, last_name, department, salary)
VALUES 
("Gail", "Justice", "Executive", 100000),
("TJ", "Kerr", "Executive", 90000),
("Noa", "Baker", "HR", 70000),
("Raja", "Yoder", "Production", 52000),
("Tammy", "Olson", "Production", 52000),
("George", "Shultz", "Sales", 45000),
("Emme", "Wicks", "Sales", 47000);

SELECT*FROM employees;

--didnt set any values for managers going to set those up by using dept i think 