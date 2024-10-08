#  A simple Form with DataBase (SQL)
* Requirements:
[NodeJS](https://nodejs.org/en/download/prebuilt-installer) Installed.
# To Run Locally
* [Step 1] Open Command prompt in Repository path and Run: <br>`npm install npm install -g nodemon`

* [Step 2] Download [MySQL 9.0 Configurator](https://dev.mysql.com/downloads/mysql/9.0.html) and start your SQl Server.

* [Step 3] The 'MySQL 9.0 Command Line Client' app will be installed with 'MySQL 9.0 Configurator'
Then paste this code below to create database and table
`CREATE DATABASE mai_users;`<br>
`USE mai_users;`<br>
`CREATE TABLE users (`<br>
`   id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100),`<br>
`   email VARCHAR(100),`<br>
`   password VARCHAR(255),`<br>
`   phone VARCHAR(15),`<br>
`   age INT,`<br>
`   gender VARCHAR(10),`<br>
`   comments TEXT,`<br>
`   submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP`<br>
`);`
`
* [Step 4] In .env file <br>`DB_PASS=?1HenryHart/?1` <br> `DB_PORT=3306`
  change '?1HenryHart/?1' to the password you used in the SQL app.
  And '3306' should be the default port if not change to the one you set in the SQL app.


* [Step 5] Then in your command line run (nodemon server.js OR node server.js).

* [Step 6] Then you can visit `http://localhost:1012` in your brower to view result.


# To View DataBase.
* Open 'MySQL 9.0 Command Line Client' app and Run `SELECT * FROM users;`
