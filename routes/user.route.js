const express = require("express");
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userControllers');

// Create Express router instance
const router = express.Router();

// ==================== USER ROUTES ====================
// These routes define the API endpoints for user operations

// POST /api/users/register - Register a new user (signup)
router.post('/register', registerUser);

// POST /api/users/login - Login user (authentication)
router.post('/login', loginUser);

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get a specific user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update user information
router.put('/:id', updateUser);

// DELETE /api/users/:id - Delete a user
router.delete('/:id', deleteUser);

module.exports = router;