// We use require to import packages

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { google } = require('googleapis')

// Initializing express app
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

// Loading Environment Variables
require('dotenv').config() // Load environment variables from .env file

// Google Sheets setup
const sheets = google.sheets('v4')

// Function to add a user data to Google Sheets
async function appendToGoogleSheet(data) {
  
const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY_BASE64,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

  const authClient = await auth.getClient();
  const sheetId = process.env.sheet_id // Your Spreadsheet ID

  const request = {
    spreadsheetId: sheetId,
    range: 'Sheet1!A1:A',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data], // Data should be an array of arrays
    },
    auth: authClient,
  }

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Data added to Google Sheet:', response);
  } catch (err) {
    console.error('Error adding data to Google Sheet:', err);
  }
}

// This displays the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // This sends a file to our home page
})

// Submit route for when the submit button is clicked
app.post('/submit-form', async (req, res) => {
  const formData = req.body

  // Prepare data array for Google Sheets
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

  // Append the data to Google Sheets
  await appendToGoogleSheet(data);

  res.send('Form data submitted');
});

// For when people try to go to sub-URLs that don't exist
app.use((req, res) => {
  res.status(404).send(`Page not found.`);
})

// This starts an express server
const port = 1012;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser.`);
})
