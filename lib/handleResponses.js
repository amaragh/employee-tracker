const Department = require('./department');
const Role = require('./role');
const Employee = require('./employee');
const po = require('../index');

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
            viewAllDepartments();
            break;
        case 'Add Department':
            break;
        default:
            console.log('Goodbye!');
    };


};
function viewAllDepartments() {
    let department = new Department();
    department.getDepartments();
    console.log("whfGHwgh");
    po.promptOptions();
}

module.exports = handleResponses;