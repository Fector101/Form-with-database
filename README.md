#  A simple Form with DataBase (SQL)
* Requirements:
[NodeJS](https://nodejs.org/en/download/prebuilt-installer) Installed.
# To Run Locally
* [Step 1] Open Command prompt in Repository path and Run 
`npm install
npm install -g nodemon`

* [Step 2] Download [MySQL 9.0 Configurator] and start your SQl Server.

* [Step 3] The 'MySQL 9.0 Command Line Client' app will be installed with 'MySQL 9.0 Configurator'
Then paste this code below to create database and table
`
CREATE DATABASE mai_users;

USE mai_users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    phone VARCHAR(15),
    age INT,
    gender VARCHAR(10),
    comments TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
* [Step 4] In .env file 
    `DB_PASS=?1HenryHart/?1
    DB_PORT=3306`
  change '?1HenryHart/?1' to the password you used in the SQL app.
  And '3306' should be the default port if not change to the one you set in the SQL app.


* [Step 5] Then in your command line run (nodemon server.js OR node server.js).

* [Step 6] Then you can visit `http://localhost:1012` in your brower to view result.


# To View DataBase.
* Open 'MySQL 9.0 Command Line Client' app and Run `SELECT * FROM users;`
