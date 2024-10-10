-- After starting server Open search and open (MySQL 9.0 Command Line Client) app 
-- And paste code below
-- This is the code to create database and table

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