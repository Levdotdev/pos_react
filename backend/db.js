const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'sql302.infinityfree.com',
  user: 'if0_40224182',
  password: 'AvFfNZ4BVJ',
  database: 'if0_40224182_store',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

module.exports = pool;
