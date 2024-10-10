// We use require to import packages
const mysql = require('mysql2')
const express = require('express')
const bcrypt = require('bcrypt')

// intiliaizing express app
const app = express()

//  Loading Enivornment Variables
require('dotenv').config(); // Load environment variables from .env file

// Creating connection with Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // set to localhost
    user: process.env.DB_USER,  // default is root
    password: process.env.DB_PASS,  //The password you used in the sql app replace it with "?1HenryHart/?1"
    database: process.env.DB_NAME   //The mai_users you used in the sql command line
})
db.connect((err) => {
    if (err) throw err // Throws error if couldn't connect
    console.log('Database connected!')
})

// This is to parse and encode data from user
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// This display's the main page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html') //This sends a file to our home page
})

// submit route 'for when the submit button is clicked'
app.post('/submit', async (req, res) => {
    const { name, email, password, phone, age, gender, comments } = req.body;
    // console.log(name, email, password, phone, age, gender, comments)

    const hashedPassword = await bcrypt.hash(password, 10);// Hash the password for security

    // Inserts new user in table
    const query = 'INSERT INTO users (name, email, password, phone, age, gender, comments) VALUES (?, ?, ?, ?, ?, ?, ?)'
    db.query(query, [name, email,hashedPassword, phone, age, gender, comments], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err)
            return res.status(500).json({ error: 'Database error' })
        }
        res.status(200).json({ message: 'User signed up successfully!' })
    })
})


// Example of another rotue to see visit(localhost:1012/product-example)
app.get('/product-example',(req,res)=>{
    res.write('<body>Some Lame Product.</body>')
    res.end()
})

app.get('/get-users',(req,res)=>{
    res.status(200).json({ message: 'All User data backend.'})
})

// For when people try to go to sub-url's that don't exist
app.use((req,res)=>{
    res.status(404).send(`Page Sinked, i.e Page dosen't exist`)
})

// This starts an express server
// Our port number an be anything in this case 1012, 1012 is like www.amazon.com
// The (localhost:1012/product-example) is like (www.amazon.com/product-example)
const port = 1012
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log(`Open http://localhost:${port} in your brower.`)
})
