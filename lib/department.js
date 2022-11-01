const db = require('../db/connection');

class Department {
    constructor(name) {
        this.name = name;
    };

    getDepartments() {
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
    }
};

// module.exports = getDepartments;
module.exports = Department;