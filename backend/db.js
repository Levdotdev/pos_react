const mysql = require('mysql2/promise');
const pool = mysql.createPool({
host: "sql110.infinityfree.com",
user: "if0_40535345",
password: "wIsuu8rW3BE2",
database: "wIsuu8rW3BE2",
port: 3306,
waitForConnections: true,
connectionLimit: 10
});
module.exports = pool;