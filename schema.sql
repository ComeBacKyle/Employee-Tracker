CREATE DATABASE EmployeesDB;

USE EmployeesDB;

CREATE TABLE department
(
    id INT
    auto_increment,
		name VARCHAR
    (30),
        PRIMARY KEY
    (id)
);

    INSERT INTO department
    VALUES
        (1, "IT"),
        (2, "Human Resources"),
        (3, "Customer Service"),
        (4, "Claims"),
        (5, "Sales");

    CREATE TABLE role
    (
        id INT
        auto_increment,
    title VARCHAR
        (30),
    salary DECIMAL,
    department_id INT ,
    PRIMARY KEY
        (id),
    FOREIGN KEY
        (department_id) 
    REFERENCES department
        (id)
);

        INSERT INTO role
        VALUES
            (1, "Sales Person", 50000, 5),
            (2, "Customer Service Rep", 50000, 3),
            (3, "Human Resources Rep", 70000, 2),
            (4, "Claims Agent", 70000, 4),
            (5, "IT Support", 90000, 1),
            (6, "Lead Engineer", 90000, 1),
            (7, "Software Developer", 90000, 1);

        CREATE TABLE employee
        (
            id INT
            auto_increment,
        first_name VARCHAR
            (30),
        last_name VARCHAR
            (30),
        role_id INT,
        manager_id INT,
        FOREIGN KEY
            (role_id) REFERENCES role
            (id),
        FOREIGN KEY
            (manager_id) REFERENCES employee
            (id),
        PRIMARY KEY
            (id)
)