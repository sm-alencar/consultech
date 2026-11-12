const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'consultech',
  password: process.env.DB_PASSWORD || 'consultech',
  database: process.env.DB_NAME || 'consultech',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;