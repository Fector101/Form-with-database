const mysql = require('mysql2');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

require('dotenv').config(); // Load environment variables from .env file

// Creating connection with Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
db.connect((err) => {
    if (err) throw err;
    console.log('Database connected!')
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this is a default to parse JSON bodies

// This display's the main page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

// submit route 'for when the submit button is clicked'
app.post('/submit', async (req, res) => {
    const { name, email, password, phone, age, gender, comments } = req.body;
    // console.log(name, email, password, phone, age, gender, comments)
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserts new user in table
    const query = 'INSERT INTO users (name, email, password, phone, age, gender, comments) VALUES (?, ?, ?, ?, ?, ?, ?)'
    db.query(query, [name, email,hashedPassword, phone, age, gender, comments], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User signed up successfully!' });
    });
});

const port = 1012
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
