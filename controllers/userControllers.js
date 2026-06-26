const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// Secret key for JWT token generation (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// ==================== USER CONTROLLERS ====================
// These functions handle the logic for each API endpoint

// 1. REGISTER USER (Signup)
// Handles user registration - creates a new user account
const registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password, full_name } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, email, and password are required' 
      });
    }

    // Check if user already exists with this email
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Create the new user (password will be hashed in the model)
    const userId = await User.create({ username, email, password, full_name });

    // Return success response
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      userId 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};

// 2. LOGIN USER
// Handles user authentication - validates credentials and returns a token
const loginUser = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Verify the password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token (valid for 24 hours)
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Return success response with token
    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// 3. GET ALL USERS
// Returns a list of all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json({ 
      success: true, 
      count: users.length,
      data: users 
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching users' 
    });
  }
};

// 4. GET USER BY ID
// Returns a single user's information by their ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching user' 
    });
  }
};

// 5. UPDATE USER
// Updates user information by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, full_name } = req.body;

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update the user
    const updated = await User.update(id, { username, email, full_name });
    
    if (updated) {
      res.status(200).json({ 
        success: true, 
        message: 'User updated successfully' 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to update user' 
      });
    }
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating user' 
    });
  }
};

// 6. DELETE USER
// Deletes a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Delete the user
    const deleted = await User.delete(id);
    
    if (deleted) {
      res.status(200).json({ 
        success: true, 
        message: 'User deleted successfully' 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to delete user' 
      });
    }
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting user' 
    });
  }
};

// Export all controller functions to be used in routes
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
