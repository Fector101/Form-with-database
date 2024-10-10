// We use require to import packages

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')


const { google } = require('googleapis')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const sheets = google.sheets('v4')

// intiliaizing express app
const app = express()

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended: true }))

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


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'form_db'
});

// function to add user
async function appendToGoogleSheet(data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json', 
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheetId = 'your-spreadsheet-id';

  const request = {
    spreadsheetId: sheetId,
    range: 'Sheet1!A1', // Where to append the data
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data], // Data should be an array of arrays
    },
    auth: authClient,
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Data added to Google Sheet:', response);
  } catch (err) {
    console.error('Error adding data to Google Sheet:', err);
  }
}

// submit route 'for when the submit button is clicked'
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO form_data (name, email, age, phone, gender, address, country, dob, occupation, feedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [formData.name, formData.email, formData.age, formData.phone, formData.gender, formData.address, formData.country, formData.dob, formData.occupation, formData.feedback], (err, result) => {
    if (err) throw err;
    res.send('Form data submitted');
  });
});
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
