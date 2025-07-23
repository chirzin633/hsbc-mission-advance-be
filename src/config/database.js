const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_videobelajar',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        const connection = await pool.promise().getConnection();
        console.log("Successfully connected to MySQL database!");
        connection.release();
    } catch (err) {
        console.error("Error connecting to MySQL database: ");
        console.error(err.message || err.code || JSON.stringify(err));
        process.exit(1);
    }
}
testDbConnection();
module.exports = pool.promise();