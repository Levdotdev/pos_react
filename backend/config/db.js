
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "sql110.infinityfree.com",
  user: "if0_40535345",
  password: "wIsuu8rW3BE2",
  database: "if0_40535345_store",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;