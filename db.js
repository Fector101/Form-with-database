const mysql = require('mysql2');
require('dotenv').config() // This loads environment variables from .env file

// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
})


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
    console.log('Connected to the MySQL database');
});

// export db to use in main.js file
module.exports = db