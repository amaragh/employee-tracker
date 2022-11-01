const Department = require('./department');
const Role = require('./role');
const Employee = require('./employee');

function handleResponses(responses) {


    let option = responses.viewOrAdd;

    switch (option) {
        case 'View All Employees':
            let employee = new Employee();
            return employee.getEmployees();
            break;
        case 'Add Employee':
            break;
        case 'Update Employee Role':
            break;
        case 'View All Roles':
            let role = new Role();
            return role.getRoles();
            break;
        case 'Add Role':
            break;
        case 'View All Departments':
            let department = new Department();
            return department.getDepartments();
            break;
        case 'Add Department':
            break;
        default:
            console.log('Goodbye!');
    }


};

module.exports = handleResponses;