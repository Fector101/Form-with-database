-- After starting server Open search and open (MySQL 9.0 Command Line Client) app 
-- And paste code below
-- This is the code to create database and table

CREATE DATABASE mai_users;

USE mai_users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT,
    phone VARCHAR(15),
    gender VARCHAR(10),
    address TEXT,
    country VARCHAR(50),
    dob DATE,
    occupation VARCHAR(50),
    feedback TEXT
);
