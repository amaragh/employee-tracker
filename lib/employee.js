const db = require('../db/connection');

class Employee {

    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    };
    
    getEmployees() {

        let sql = `SELECT e.id, e.first_name, e.last_name, 
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
            // const transformed = rows.reduce((acc, { id, ...x }) => { 
            //     acc[id] = x; 
            //     return acc 
            // }, {})
            // console.table(transformed);

            console.table(rows);

        });

    }
};

module.exports = Employee;