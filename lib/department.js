const db = require('../db/connection');

function getDepartments() {

    let sql = `SELECT * FROM department`;

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
    return;
};

// class Department {
//     constructor(name) {
//         this.name = name;
//     };

//     getDepartments() {

//         // return sql;
//     }
// };

module.exports = getDepartments;