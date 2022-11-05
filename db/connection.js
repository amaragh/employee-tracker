const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localHost',
        // Your MySQL username
        user: 'root',
        // Your MySQL password
        password: 'password',
        database: 'company',
        multipleStatements:true
    },
    console.log('Connected to the company database.')
);

module.exports = db;