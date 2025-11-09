# Pet Adoption - Setup Guide

This guide will help you get the Pet Adoption platform up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **MongoDB** 7 or higher ([Download](https://www.mongodb.com/try/download/community))
  - OR **Docker** and **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/downloads))

## 🚀 Quick Start (5 minutes)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd pet-adoption
```

### Step 2: Backend Setup

#### Option A: Using Docker (Recommended)

```bash
cd backend
docker-compose up -d
```

This will start both MongoDB and the API server. The API will be available at http://localhost:8080

#### Option B: Local Installation

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings (use notepad or any text editor)
# Make sure MongoDB is running on your system

# Start the server
npm run dev
```

The API will be available at http://localhost:8080

### Step 3: Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will be available at http://localhost:5173

### Step 4: Access the Application

1. Open your browser and go to http://localhost:5173
2. Click "Register" to create a new account
3. Login with your credentials
4. Start exploring the platform!

## 🧪 Verify Installation

### Check Backend

1. Visit http://localhost:8080/api-docs
2. You should see the Swagger API documentation

### Check Frontend

1. Visit http://localhost:5173
2. You should see the Pet Adoption home page

## 📝 Create Sample Data

### Create an Admin User

You can create an admin user by registering normally and then updating the database:

```bash
# Connect to MongoDB
mongosh

# Switch to the database
use petadoption

# Update a user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Add Sample Pets (Admin Only)

Once you have an admin account:

1. Login to the application
2. Use the API documentation at http://localhost:8080/api-docs
3. Use the POST /api/pets endpoint to create pets

Or use curl:

```bash
# Login first to get the cookie
curl -X POST http://localhost:8080/api/sessions/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}' \
  -c cookies.txt

# Create a pet
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Buddy",
    "specie": "Dog",
    "birthDate": "2020-01-01",
    "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
  }'
```

## 🔧 Troubleshooting

### Backend Issues

**Problem**: "Cannot connect to MongoDB"
- **Solution**: Make sure MongoDB is running
  - If using Docker: `docker-compose ps` should show MongoDB running
  - If local: Start MongoDB with `mongod`

**Problem**: "Port 8080 already in use"
- **Solution**: Change the PORT in backend/.env to another port (e.g., 3000)

**Problem**: "JWT_SECRET is not defined"
- **Solution**: Make sure you copied .env.example to .env and set JWT_SECRET

### Frontend Issues

**Problem**: "Cannot connect to API"
- **Solution**: 
  1. Check that backend is running on http://localhost:8080
  2. Verify VITE_API_URL in frontend/.env matches your backend URL

**Problem**: "Port 5173 already in use"
- **Solution**: Vite will automatically use the next available port

**Problem**: "CORS errors"
- **Solution**: Make sure backend CORS is configured to allow http://localhost:5173

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend

# Unit tests
npm test

# E2E tests (make sure backend is running)
npm run cypress:open
```

## 🐳 Docker Commands

### Start services
```bash
cd backend
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Restart services
```bash
docker-compose restart
```

### Remove all data (⚠️ Warning: This deletes all data)
```bash
docker-compose down -v
```

## 📚 Next Steps

1. **Explore the API**: Visit http://localhost:8080/api-docs
2. **Read the Documentation**: Check README.md files in backend/ and frontend/
3. **Customize**: Modify the code to fit your needs
4. **Deploy**: Follow deployment guides in the main README.md

## 🆘 Getting Help

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs:
   - Backend: Check terminal where `npm run dev` is running
   - Frontend: Check browser console (F12)
3. Open an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)

## 🎉 Success!

If you can see the Pet Adoption home page and the API documentation, you're all set! 

Happy coding! 🐾
