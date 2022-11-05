const inquirer = require('inquirer');
const db = require('./db/connection');

const promptOptions = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'viewOrAdd',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ])
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

// call functions depending on the response to the prompt
function handleResponses(responses) {
    let option = responses.viewOrAdd;
    switch (option) {
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmpRole();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        default:
            quit();
    };
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
        if (err) throw err;
        console.table(rows);
        loadPrompts();
    });
};

function viewDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        loadPrompts();
    });
};

function addEmployee() {
    const roleMgrQuery = `SELECT * from role; SELECT CONCAT (first_name," ",last_name) AS full_name FROM employee;`;

    db.query(roleMgrQuery, (err, result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'empRole',
                message: "What is the employee's role?",
                choices: function () {
                    let roleArr = result[0].map(role => role.title);
                    return roleArr;
                }
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: function () {
                    let mgrArr = result[1].map(mgr => mgr.full_name);
                    return mgrArr;
                }
            }
        ]).then(answer => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES(?,?,(SELECT id from role where title = ?), 
                        (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?) AS temp))`
            const params = [answer.firstName, answer.lastName, answer.empRole, answer.manager];
            db.query(sql, params, (err, result) => {
                if (err) throw err;
            })
            console.log(`Added employee ${answer.firstName} ${answer.lastName} to the database`);
            loadPrompts();
        })
    })

};

function updateEmpRole() {
    const empRoleQuery = `SELECT CONCAT (first_name," ",last_name) AS full_name FROM employee; SELECT * from role;`;

    db.query(empRoleQuery, (err, result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'empToUpdate',
                message: "Which employee's role do you want to update?",
                choices: function () {
                    let empArr = result[0].map(emp => emp.full_name);
                    return empArr;
                }
            },
            {
                type: 'list',
                name: 'empUpdatedRole',
                message: "Which role do you want to assign to the selected employee?",
                choices: function () {
                    let roleArr = result[1].map(role => role.title);
                    return roleArr;
                }
            }
        ]).then(answer => {
            const sql = `UPDATE employee 
                        SET role_id = (SELECT id FROM role WHERE title = ?)
                        WHERE id = (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?) AS temp)`
            let params = [answer.empUpdatedRole, answer.empToUpdate];
            db.query(sql, params, (err, result) => {
                if (err) throw err;
            })
            console.log(`Role for ${answer.empToUpdate} has been updated to ${answer.empUpdatedRole}`);
            loadPrompts();
        })
    })

}

function addDepartment() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: "What is the name of the department?"
        }
    ]).then(answer => {
        const sql = `INSERT INTO department (name) VALUE (?)`;
        db.query(sql, answer.newDept, (err, result) => {
            if (err) throw err;
        })
        console.log(`Added ${answer.newDept} department to the database`);
        loadPrompts();
    })
};

function addRole() {

    const deptQuery = `SELECT * FROM department`

    db.query(deptQuery, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: "What is the name of the role?"
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?"
            },
            {
                type: 'list',
                name: 'roleDept',
                message: "To which department does the role belong?",
                choices: function () {
                    let deptArr = results.map(array => array.name);
                    return deptArr;
                }
            }
        ]).then(answer => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,(SELECT id from department where name = ?))`;
            let params = [answer.newRole, answer.salary, answer.roleDept];
            db.query(sql, params, (err, result) => {
                if (err) throw err;
            })
            console.log(`Added ${answer.newRole} role to the database`);
            loadPrompts();
        })
    })
};

function quit() {
    console.log('Goodbye!');
    process.exit();
};

loadPrompts();