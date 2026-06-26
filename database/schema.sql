-- ============================================
-- User Management Database Schema
-- ============================================
-- This SQL script creates the database and users table
-- Run this script in your MySQL database before starting the application
-- ============================================

-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS flutter_db;

-- Use the database
USE flutter_db;

-- Create the users table
-- This table stores user information including hashed passwords
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,           -- Unique user ID (auto-increment)
  username VARCHAR(50) NOT NULL,                -- User's username
  email VARCHAR(100) NOT NULL UNIQUE,           -- User's email (must be unique)
  password VARCHAR(255) NOT NULL,               -- Hashed password (never store plain text!)
  full_name VARCHAR(100),                       -- User's full name (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Account creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last update timestamp
);

-- Add an index on email for faster lookups during login
CREATE INDEX idx_email ON users(email);

-- Add an index on username for faster searches
CREATE INDEX idx_username ON users(username);

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================
-- Uncomment the lines below to insert sample users

-- INSERT INTO users (username, email, password, full_name) 
-- VALUES 
--   ('john_doe', 'john@example.com', 'hashed_password_here', 'John Doe'),
--   ('jane_smith', 'jane@example.com', 'hashed_password_here', 'Jane Smith');

-- ============================================
-- Notes for Students:
-- ============================================
-- 1. The 'password' field stores HASHED passwords, not plain text
-- 2. Always use bcrypt or similar library to hash passwords before storing
-- 3. The email field is UNIQUE - no two users can have the same email
-- 4. The id field is AUTO_INCREMENT - MySQL automatically assigns unique IDs
-- 5. Timestamps help track when users were created and last updated
-- ============================================
