const getDepartments = require('./department');
const getRoles = require('./role');
const getEmployees = require('./employee');

function handleResponses(responses) {

    let option = responses.viewOrAdd;

    switch (option) {
        case 'View All Employees':
            return getEmployees();
            break;
        case 'Add Employee':
            break;
        case 'Update Employee Role':
            break;
        case 'View All Roles':
            return getRoles();
            break;
        case 'Add Role':
            break;
        case 'View All Departments':
            return getDepartments();
            break;
        case 'Add Department':
            break;
        default:
            console.log('Goodbye!');
    }


};

module.exports = handleResponses;