# Node.js - Introduction for Beginners

## 🎯 What is Node.js?

Node.js is a **JavaScript runtime** that allows you to run JavaScript on your computer (server-side), not just in web browsers.

### Before Node.js:
- JavaScript only ran in web browsers (Chrome, Firefox, etc.)
- You couldn't use JavaScript to build server applications
- Server-side programming required languages like PHP, Python, Java, or Ruby

### After Node.js:
- JavaScript can now run on servers and computers
- You can build complete web applications using only JavaScript
- Same language for both frontend (browser) and backend (server)

---

## 🤔 Why Do We Need Node.js?

### 1. **Unified Language**
- Use JavaScript for both frontend and backend
- Don't need to learn multiple programming languages
- Easier for web developers to become full-stack developers

### 2. **Fast Performance**
- Built on Chrome's V8 JavaScript engine (very fast)
- Uses non-blocking, event-driven architecture
- Handles many connections simultaneously

### 3. **Huge Ecosystem**
- npm (Node Package Manager) with over 1 million packages
- Ready-made libraries for almost any task
- Easy to add functionality to your projects

### 4. **Real-time Applications**
- Perfect for chat applications, gaming, streaming
- Handles real-time data efficiently
- Great for APIs and microservices

### 5. **Cross-Platform**
- Runs on Windows, Mac, and Linux
- Build applications that work everywhere
- Same code runs on different operating systems

---

## 📦 What You Need to Install Node.js

### Prerequisites:
1. **A Computer** - Windows, Mac, or Linux
2. **Internet Connection** - To download Node.js and packages
3. **Text Editor or IDE** - VS Code (recommended), Sublime Text, or any code editor
4. **Terminal/Command Prompt** - Already installed on your operating system

### Optional but Recommended:
- **Git** - For version control
- **MySQL** - If you're building database applications (like our project)

---

## 🚀 How to Install Node.js

### Step 1: Download Node.js

1. Go to the official website: https://nodejs.org/
2. You'll see two download options:
   - **LTS (Long Term Support)** - Recommended for most users (stable)
   - **Current** - Latest features (might have bugs)
3. Click the LTS version for your operating system (Windows/Mac/Linux)

### Step 2: Install Node.js

#### For Windows:
1. Run the downloaded `.msi` installer
2. Click "Next" through the installation wizard
3. Accept the license agreement
4. Choose the default installation folder
5. Make sure "Add to PATH" is checked (important!)
6. Click "Install" and wait for completion
7. Click "Finish"

#### For Mac:
1. Run the downloaded `.pkg` installer
2. Follow the installation wizard
3. Continue through each step
4. Install with default settings
5. Close the installer when done

#### For Linux (Ubuntu/Debian):
```bash
# Using the package manager
sudo apt update
sudo apt install nodejs npm
```

### Step 3: Verify Installation

Open your terminal/command prompt and type:

```bash
node --version
```

You should see something like: `v20.10.0` (version number)

```bash
npm --version
```

You should see something like: `10.2.3` (version number)

If you see version numbers, Node.js is installed successfully! ✅

---

## 🔧 What is npm?

**npm** stands for **Node Package Manager**. It comes installed with Node.js.

### What does npm do?
- Downloads and installs libraries/packages for your projects
- Manages dependencies (what your project needs)
- Allows you to share your own packages
- Runs scripts and commands for your projects

### Common npm commands:
```bash
npm init          # Initialize a new project
npm install       # Install packages
npm start         # Start your application
npm run dev       # Run in development mode
```

---

## 📁 Understanding Our Project Structure

Now that you have Node.js installed, let's understand how our User Management API project connects everything together:

### Project Overview:
We built a **REST API** that allows users to:
- Register (signup)
- Login
- View all users
- Get specific user details
- Update user information
- Delete users

### How Node.js Connects Everything:

```
┌─────────────────────────────────────────────────┐
│              Client (Browser/App)               │
│            Makes HTTP Requests                   │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│           Node.js Server (Express.js)            │
│  - Receives requests                             │
│  - Routes to correct controller                  │
│  - Returns JSON responses                        │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         Controllers (Business Logic)            │
│  - Validates input                               │
│  - Calls model functions                         │
│  - Handles authentication (JWT)                  │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│           Models (Database Layer)               │
│  - Executes SQL queries                          │
│  - Hashes passwords (bcrypt)                     │
│  - Returns data from database                    │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│              MySQL Database                      │
│  - Stores user data                              │
│  - Persists information                          │
└─────────────────────────────────────────────────┘
```

### File-by-File Explanation:

#### 1. **package.json**
- Project configuration file
- Lists all dependencies (libraries we need)
- Contains scripts to run the project
- Created with `npm init`

#### 2. **server.js** (Entry Point)
- Main file that starts the application
- Sets up Express server
- Configures middleware (CORS, body-parser)
- Mounts routes
- Starts listening on port 3000

#### 3. **config/db.config.js**
- Database connection configuration
- Creates connection pool to MySQL
- Uses environment variables for security
- Tests database connection on startup

#### 4. **models/User.model.js**
- Contains all database operations
- Functions: create, findByEmail, findById, getAll, update, delete
- Handles password hashing with bcrypt
- Separates database logic from business logic

#### 5. **controllers/userControllers.js**
- Business logic for each endpoint
- Validates user input
- Calls model functions
- Generates JWT tokens for authentication
- Returns appropriate HTTP responses

#### 6. **routes/user.route.js**
- Defines API endpoints (URLs)
- Maps HTTP methods to controllers
- Organizes routes by functionality
- Example: `POST /api/users/register` → `registerUser` controller

#### 7. **.env**
- Environment variables file
- Stores sensitive information (passwords, keys)
- Not committed to git (security)
- Used by `dotenv` package

#### 8. **database/schema.sql**
- SQL script to create database and tables
- Defines table structure
- Creates indexes for performance
- Run this in MySQL before starting the app

---

## 🎓 Key Concepts You'll Learn

### 1. **REST API**
- Representational State Transfer
- Uses standard HTTP methods (GET, POST, PUT, DELETE)
- Returns JSON data
- Stateless communication

### 2. **MVC Architecture**
- **Model** - Data layer (database operations)
- **View** - Presentation layer (not used in APIs)
- **Controller** - Business logic layer

### 3. **Middleware**
- Functions that process requests
- Runs between request and response
- Examples: CORS, body-parser, authentication

### 4. **Authentication**
- JWT (JSON Web Tokens)
- Password hashing with bcrypt
- Secure user identification

### 5. **Database Integration**
- MySQL connection
- SQL queries
- Data persistence

---

## 🛠️ How to Run Our Project

### Step 1: Install Dependencies
```bash
npm install
```
This downloads all the packages listed in `package.json`

### Step 2: Setup Database
- Open MySQL Workbench or terminal
- Run the SQL from `database/schema.sql`
- This creates the `flutter_db` database and `users` table

### Step 3: Configure Environment
- Edit `.env` file with your MySQL credentials
- Update `DB_PASSWORD` if you have a MySQL password

### Step 4: Start the Server
```bash
npm run dev
```
This starts the server with nodemon (auto-restart on changes)

Or for production:
```bash
npm start
```

### Step 5: Test the API
Open your browser and go to: http://localhost:3000

You should see the API welcome message!

---

## 📚 Next Steps for Learning

1. **JavaScript Basics** - Variables, functions, arrays, objects
2. **Node.js Modules** - require(), module.exports
3. **Express.js Framework** - Routes, middleware, requests
4. **Database Basics** - SQL, tables, relationships
5. **API Design** - REST principles, HTTP status codes
6. **Authentication** - JWT, sessions, OAuth
7. **Error Handling** - Try-catch, error middleware
8. **Testing** - Unit tests, integration tests

---

## 💡 Why This Matters

Understanding Node.js opens doors to:
- Building web servers and APIs
- Creating real-time applications
- Developing microservices
- Building command-line tools
- Automating tasks with scripts
- Becoming a full-stack developer

---

## 🎯 Summary

**Node.js** is JavaScript running on servers, allowing you to:
- Build backend applications with JavaScript
- Use the same language for frontend and backend
- Access thousands of packages through npm
- Build fast, scalable applications

**Our Project** demonstrates:
- How Node.js connects to databases
- How to build REST APIs
- How to handle authentication
- How to organize code using MVC pattern

**You're now ready** to explore the project code and understand how everything works together!

---

## 📖 Additional Resources

- Official Node.js Documentation: https://nodejs.org/docs/
- npm Documentation: https://docs.npmjs.com/
- Express.js Guide: https://expressjs.com/en/guide/routing.html
- MySQL Documentation: https://dev.mysql.com/doc/

---

**Happy Coding! 🚀**
