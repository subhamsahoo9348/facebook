const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    database:"facebook1",
    user:"root",
    password:"suvam123"
}
);

module.exports = pool.promise();