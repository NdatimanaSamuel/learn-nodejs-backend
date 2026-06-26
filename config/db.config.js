const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool to the MySQL database
// Using a pool is better for performance and handling multiple connections
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',      // Database host (default: localhost)
  user: process.env.DB_USER || 'root',           // Database username (default: root)
  password: process.env.DB_PASSWORD || '',       // Database password (default: empty)
  database: process.env.DB_NAME || 'flutter_db',     // Database name (default: user_db)
  waitForConnections: true,
  connectionLimit: 10,                            // Maximum number of connections in the pool
  queueLimit: 0
});

// Convert the pool to use promises (async/await syntax)
const promisePool = pool.promise();

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Successfully connected to MySQL database!');
  connection.release(); // Release the connection back to the pool
});

module.exports = promisePool;
