const db = require('../db/connection');

function getRoles() {

    let sql = `SELECT role.id,role.title,department.name AS department, role.salary
              FROM role
              LEFT JOIN department 
              ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // const transformed = rows.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})
        // console.table(transformed);

        console.table(rows);


    });
    return;
};

module.exports = getRoles;