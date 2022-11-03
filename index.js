const inquirer = require('inquirer');
const db = require('./db/connection');

const promptOptions = async () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'viewOrAdd',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            when: (answers) => {
                return answers.viewOrAdd === 'Add Employee';
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            when: (answers) => {
                return answers.viewOrAdd === 'Add Employee';
            }
        },
        {
            type: 'list',
            name: 'empRole',
            message: "What is the employee's role?",
            choices: await roleChoices(),
            when: (answers) => {
                return answers.viewOrAdd === 'Add Employee';
            }
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: await employeeChoices(),
            when: (answers) => {
                return answers.viewOrAdd === 'Add Employee';
            }
        },
        {
            type: 'list',
            name: 'empToUpdate',
            message: "Which employee's role do you want to update?",
            choices: await employeeChoices(),
            when: (answers) => {
                return answers.viewOrAdd === 'Update Employee Role';
            }
        },
        {
            type: 'list',
            name: 'empUpdatedRole',
            message: "Which role do you want to assign to the selected employee?",
            choices: await roleChoices(),
            when: (answers) => {
                return answers.viewOrAdd === 'Update Employee Role';
            }
        },
        {
            type: 'input',
            name: 'newDept',
            message: "What is the name of the department?",
            when: (answers) => {
                return answers.viewOrAdd === 'Add Department';
            }
        },
        {
            type: 'input',
            name: 'newRole',
            message: "What is the name of the role?",
            when: (answers) => {
                return answers.viewOrAdd === 'Add Role';
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role?",
            when: (answers) => {
                return answers.viewOrAdd === 'Add Role';
            }
        },
        {
            type: 'list',
            name: 'roleDept',
            message: "Which department does the role belong to?",
            choices: await departmentChoices(),
            when: (answers) => {
                return answers.viewOrAdd === 'Add Role';
            }
        }
    ])
        .then(answers => { return answers });
};

function loadPrompts() {
    promptOptions()
        .then(answers => {
            return handleResponses(answers);
        })
        .catch(err => {
            console.log(err);
        });
};

function handleResponses(responses) {
    let option = responses.viewOrAdd;
    switch (option) {
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add Employee':
            break;
        case 'Update Employee Role':
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'Add Role':
            // console.log(responses.newRole, responses.salary, responses.roleDept.id);
            // addRole();
            break;
        case 'View All Departments':
            viewDepartments();
            break;
        case 'Add Department':
            addDepartment(responses.newDept);
            break;
        default:
            quit();
    };
};

 function employeeChoices() {
    const sql = `SELECT concat(first_name,' ', last_name) AS value, id FROM employee`;
    const roles = await db.query(sql);
    return roles[0];
};

async function roleChoices() {
    const sql = `SELECT title AS value, id FROM role`;
    const roles = await db.query(sql);
    return roles[0];
};
async function departmentChoices() {
    const sql = `SELECT name AS value, id FROM department`;
    const roles = await db.query(sql);
    return roles[0];
};

function viewEmployees() {

    const sql = `SELECT e.id, e.first_name, e.last_name, 
                    role.title AS title, department.name AS department, role.salary AS salary, 
                    concat(m.first_name,' ', m.last_name) AS manager
                    FROM employee e
                    LEFT JOIN role
                    ON e.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee m
                    ON e.manager_id = m.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        loadPrompts();
    });
};

function viewRoles() {
    const sql = `SELECT role.id,role.title,department.name AS department, role.salary
                FROM role
                LEFT JOIN department 
                ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        loadPrompts();
    });
};

function viewDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // const transformed = rows.reduce((acc, { id, ...x }) => { 
        //     acc[id] = x; 
        //     return acc 
        // }, {})
        // console.table(transformed);

        console.table(rows);
        loadPrompts();
    });
};


function addDepartment(deptName) {
    const sql = `INSERT INTO department (name) VALUE (?)`;

    db.query(sql, deptName, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(`Added ${deptName} to the database`);
        loadPrompts();
    });
};

function addRole(newRole, salary, roleDept) {

    // const deptSql = `SELECT id FROM department where name = ${roleDept}`;
    // db.query(deptSql, (err, rows) => {
    //     if (err) {
    //         res.status(500).json({ error: err.message });
    //         return;
    //     }
    //     console.log(rows);

    // });
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ("Party Planner II",25000,5)`;
    const params = [newRole, salary, roleDept];

     

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(`Added ${newRole} to the database`);
        loadPrompts();
    });
};

function quit() {
    console.log('Goodbye!');
    process.exit();
};

loadPrompts();