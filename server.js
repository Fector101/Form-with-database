// We use require to import packages
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { google } = require('googleapis')
// const {authenticate} = require('@google-cloud/local-auth');


// Initializing express app
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

// Loading Environment Variables
require('dotenv').config() // Load environment variables from .env file


// Function to add user data to Google Sheets
async function appendToGoogleSheet(data) {
  const auth = new google.auth.GoogleAuth({
    // credentials: {
    //   private_key: process.env.GOOGLE_PRIVATE_KEY, // Ensure this matches the .env variable
    //   client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // },
    keyFile:'credentials.json',
    // projectId: process.env.GOOGLE_PROJECT_ID,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  console.log(11)
  const authClient = await auth.getClient()


  // Google Sheets setup
  const sheets = google.sheets({version:'v4',auth:authClient})
  console.log(sheets)
  // const md = await sheets.spreadsheets.get({auth,spreadsheetId:process.env.sheet_id})
  // console.log(md)
  const request = {
    spreadsheetId: process.env.sheet_id,
    range: 'Sheet1!A1:A',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data], // Data should be an array of arrays
    },
    auth: authClient,
  }

  try {
    const response = await sheets.spreadsheets.values.append(request)
    console.log('Data added to Google Sheet:', response)
  } catch (err) {
    console.error('Error adding data to Google Sheet:', err)
    throw err // Rethrow to handle in the calling function
  }
}

// This displays the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))// This sends a file to our home page
})

// Submit route for when the submit button is clicked
app.post('/submit-form', async (req, res) => {
  const formData = req.body

  // Prepare data array for Google Sheets
  // console.log(req.body)
  const data = [
    formData.name,
    formData.email,
    formData.age,
    formData.phone,
    formData.gender,
    formData.address,
    formData.country,
    formData.dob,
    formData.occupation,
    formData.feedback,
  ]
//   console.log(data)
// res.status(200).json({message:req.body})

  // Append the data to Google Sheets
  try {
    await appendToGoogleSheet(data)
    res.status(200).json({ message: 'Form data submitted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit data to Google Sheets' })
  }
})

// For when people try to go to sub-URLs that don't exist
app.use((req, res) => {
  res.status(404).send(`Page not found.`);
})

// This starts an express server
const port = 1012;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser.`);
});
