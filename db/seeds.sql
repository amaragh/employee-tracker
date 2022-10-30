INSERT INTO department (name)
VALUES
    ('Finance'),
    ('Engineering'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, department_id, salary)
VALUES
    ('Salesperson', 4, 25000),
    ('Sales Lead',4,40000),
    ('Lawyer', 3, 50000),
    ('Accountant', 1, 55000),
    ('Engineering Manager', 2, 60000),
    ('Paralegal', 3, 20000),
    ('Engineer II', 2, 56000),
    ('Financial Analyst', 1, 33000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Maggie', 'Jones', 2,null),
    ('Ben', 'Rogers', 1, 1),
    ('Ryan', 'White', 5,null),
    ('Jeff', 'Ross', 7, 3),
    ('Simone', 'Green', 3,null),
    ('Trisha', 'Smith', 6, null),
    ('Chris', 'Copeland', 8,null),
    ('Harris', 'Frank', 4,null),
    ('Lisa','Brown',7,4),
    ('Andrew','March', 3,null),
    ('Fred', 'Strait', 4, 2);
