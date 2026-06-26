const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

// User Model - Handles all database operations for users
class User {
  
  // Create a new user (signup)
  // This method inserts a new user record into the database
  static async create(userData) {
    const { username, email, password, full_name } = userData;
    
    // Hash the password before storing it in the database
    // This is a security best practice - never store plain text passwords!
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const sql = 'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [username, email, hashedPassword, full_name]);
    
    return result.insertId; // Return the ID of the newly created user
  }

  // Find a user by their email (used for login)
  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows[0]; // Return the user object or undefined if not found
  }

  // Find a user by their ID
  static async findById(id) {
    const sql = 'SELECT id, username, email, full_name, created_at FROM users WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0]; // Return the user object or undefined if not found
  }

  // Get all users from the database
  static async getAll() {
    const sql = 'SELECT id, username, email, full_name, created_at FROM users ORDER BY created_at DESC';
    const [rows] = await db.execute(sql);
    return rows; // Return array of all users
  }

  // Update user information
  static async update(id, userData) {
    const { username, email, full_name } = userData;
    const sql = 'UPDATE users SET username = ?, email = ?, full_name = ? WHERE id = ?';
    const [result] = await db.execute(sql, [username, email, full_name, id]);
    return result.affectedRows > 0; // Return true if update was successful
  }

  // Delete a user by ID
  static async delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0; // Return true if deletion was successful
  }

  // Verify password during login
  // Compares the plain text password with the hashed password in database
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
