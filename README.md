# User Management API - Node.js Backend

A simple and complete REST API for user management built with Node.js, Express, and MySQL. This project demonstrates fundamental backend concepts including authentication, CRUD operations, and database integration.

## 📋 Features

- **User Registration (Signup)** - Create new user accounts with password hashing
- **User Login** - Authenticate users with JWT (JSON Web Tokens)
- **Get All Users** - Retrieve a list of all users
- **Get User by ID** - Fetch a specific user's details
- **Update User** - Modify user information
- **Delete User** - Remove user accounts
- **Password Security** - Passwords are hashed using bcrypt before storage
- **JWT Authentication** - Secure token-based authentication

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing

## 📁 Project Structure

```
nodejs-backend/
├── config/
│   └── db.config.js          # Database configuration
├── controllers/
│   └── userControllers.js    # Business logic for user operations
├── models/
│   └── User.model.js         # Database queries and user model
├── routes/
│   └── user.route.js         # API route definitions
├── database/
│   └── schema.sql            # SQL schema for users table
├── server.js                 # Main application entry point
├── package.json              # Project dependencies
├── .env                      # Environment variables (create this)
└── README.md                 # This file
```

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **npm** (comes with Node.js)

### Step 1: Clone or Download the Project

If you have this project in a folder, navigate to it:

```bash
cd /path/to/nodejs-backend
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- express
- mysql2
- bcryptjs
- jsonwebtoken
- cors
- body-parser
- dotenv

### Step 3: Setup MySQL Database

#### Option A: Using MySQL Command Line

1. Open your terminal and login to MySQL:
```bash
mysql -u root -p
```

2. Run the schema script to create the database and table:
```bash
source /path/to/nodejs-backend/database/schema.sql
```

Or manually execute:
```sql
CREATE DATABASE IF NOT EXISTS user_db;
USE user_db;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. Exit MySQL:
```bash
exit;
```

#### Option B: Using MySQL Workbench or phpMyAdmin

1. Open MySQL Workbench or phpMyAdmin
2. Create a new database named `user_db`
3. Run the SQL from `database/schema.sql` file
4. Execute the script to create the users table

### Step 4: Configure Environment Variables

Create a `.env` file in the project root directory:

```bash
touch .env
```

Add the following configuration (adjust values based on your MySQL setup):

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_db

# Server Configuration
PORT=3000

# JWT Secret (change this to a random string in production)
JWT_SECRET=your_super_secret_jwt_key_here

# Environment
NODE_ENV=development
```

**Note:** If you haven't set a MySQL password, leave `DB_PASSWORD` empty.

### Step 5: Start the Server

Run the application:

```bash
node server.js
```

You should see:
```
=================================
🚀 Server is running on port 3000
📝 API Documentation: http://localhost:3000
=================================
Successfully connected to MySQL database!
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/users/register` | Register a new user | `{ username, email, password, full_name }` |
| POST | `/api/users/login` | Login user | `{ email, password }` |
| GET | `/api/users` | Get all users | None |
| GET | `/api/users/:id` | Get user by ID | None |
| PUT | `/api/users/:id` | Update user | `{ username, email, full_name }` |
| DELETE | `/api/users/:id` | Delete user | None |

## 🧪 Testing the API

You can test the API using:
- **Postman** - [Download here](https://www.postman.com/downloads/)
- **curl** (command line)
- **Thunder Client** (VS Code extension)

### Example Requests

#### 1. Register a New User

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure123",
    "full_name": "John Doe"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

#### 2. Login

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

#### 3. Get All Users

```bash
curl http://localhost:3000/api/users
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 4. Get User by ID

```bash
curl http://localhost:3000/api/users/1
```

#### 5. Update User

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_updated",
    "email": "john_updated@example.com",
    "full_name": "John Updated"
  }'
```

#### 6. Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## 📚 Code Explanation for Students

### How the Application Works

#### 1. **server.js** - Entry Point
- Initializes the Express application
- Sets up middleware (CORS, body-parser)
- Mounts the routes
- Starts the server on port 3000

#### 2. **config/db.config.js** - Database Connection
- Creates a connection pool to MySQL
- Connection pooling improves performance
- Uses environment variables for configuration

#### 3. **models/User.model.js** - Data Layer
- Contains all database queries
- Handles password hashing with bcrypt
- Provides methods: create, findByEmail, findById, getAll, update, delete

#### 4. **controllers/userControllers.js** - Business Logic
- Contains the logic for each endpoint
- Validates input data
- Calls model methods
- Returns appropriate HTTP responses
- Generates JWT tokens for authentication

#### 5. **routes/user.route.js** - API Routes
- Defines the URL endpoints
- Connects each endpoint to its controller function
- Organizes routes by HTTP method (GET, POST, PUT, DELETE)

### Key Concepts Explained

#### MVC Architecture
- **Model** (`User.model.js`) - Handles data and database operations
- **View** - Not used in this API (API returns JSON)
- **Controller** (`userControllers.js`) - Handles business logic

#### Password Hashing
- Passwords are NEVER stored as plain text
- bcrypt adds a "salt" (random data) before hashing
- Even if the database is compromised, passwords remain secure

#### JWT (JSON Web Tokens)
- Used for authentication after login
- Token contains user information (encrypted)
- Valid for 24 hours (configurable)
- Client sends token with subsequent requests to prove identity

#### RESTful API Design
- Uses standard HTTP methods (GET, POST, PUT, DELETE)
- Returns JSON responses
- Uses appropriate HTTP status codes (200, 201, 400, 404, 500)

## 🔒 Security Best Practices

1. **Never store plain text passwords** - Always hash them
2. **Use environment variables** - Never commit sensitive data to git
3. **Validate input** - Always check required fields
4. **Use HTTPS in production** - Encrypt data in transit
5. **Implement rate limiting** - Prevent brute force attacks
6. **Keep dependencies updated** - Run `npm audit` regularly

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify MySQL is running
- Check database credentials in `.env`

### Database connection error
- Ensure MySQL service is running
- Verify database credentials
- Check if `user_db` database exists

### "Module not found" error
- Run `npm install` to install dependencies
- Check if `node_modules` folder exists

## 📝 Additional Notes for Teaching

This project is designed for educational purposes. For production use, consider adding:

- Input validation library (e.g., joi, express-validator)
- Authentication middleware to protect routes
- Rate limiting to prevent abuse
- Logging (e.g., winston, morgan)
- API documentation (e.g., Swagger)
- Unit and integration tests
- Docker containerization

## 📄 License

This project is for educational purposes.

## 👨‍🏫 For Instructors

This project covers the following topics:
- RESTful API design
- Express.js framework
- MySQL database integration
- Authentication with JWT
- Password security with bcrypt
- MVC architecture pattern
- Environment variables
- Error handling
- HTTP status codes

Feel free to modify and extend this project for your teaching needs!


Test the API in your browser:
Root endpoint: http://localhost:3000
Register: POST http://localhost:3000/api/users/register
Login: POST http://localhost:3000/api/users/login
Get all users: GET http://localhost:3000/api/users