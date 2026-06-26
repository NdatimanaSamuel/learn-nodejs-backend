const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import user routes
const userRouter = require('./routes/user.route');

// Initialize Express app
const app = express();

// ==================== MIDDLEWARE ====================
// Middleware functions that process requests before they reach routes

// Enable CORS (Cross-Origin Resource Sharing)
// This allows frontend applications to communicate with this backend
app.use(cors());

// Parse incoming JSON request bodies
// This allows us to access req.body in our controllers
app.use(bodyParser.json());

// Parse URL-encoded request bodies
// This handles form data submissions
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== ROUTES ====================
// Mount the user routes at /api/users endpoint
app.use('/api/users/', userRouter);

// Root endpoint - API health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to User Management API',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      getAllUsers: 'GET /api/users',
      getUserById: 'GET /api/users/:id',
      updateUser: 'PUT /api/users/:id',
      deleteUser: 'DELETE /api/users/:id'
    }
  });
});

// ==================== ERROR HANDLING ====================
// 404 handler - for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
  console.log(`=================================`);
});
