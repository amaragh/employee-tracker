const inquirer = require('inquirer');

const promptOptions = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'viewOrAdd',
            message: 'What would you like to do??',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
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
            type: 'input',
            name: 'empRole',
            message: "What is the employee's role?",
            when: (answers) => {
                return answers.viewOrAdd === 'Add Employee';
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: [],
            when: (answers) => {
                return answers.viewOrAdd === 'Add Employee';
            }
        },
        {
            type: 'input',
            name: 'updateEmp',
            message: "Which employee's role do you want to update?",
            choices: [],
            when: (answers) => {
                return answers.viewOrAdd === 'Update Employee Role';
            }
        },
        {
            type: 'input',
            name: 'empNewRole',
            message: "Which role do you want to assign to the selected employee?",
            choices: [],
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
            choices: [],
            when: (answers) => {
                return answers.viewOrAdd === 'Add Role';
            }
        }
    ])
};

promptOptions();