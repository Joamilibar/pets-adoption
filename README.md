# Pet Adoption Platform

A full-stack web application for pet adoption management built with Node.js, Express, MongoDB, React, and Material-UI.

## 🌟 Features

### Backend
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with HttpOnly cookies
- **Role-based Access Control** (User/Admin)
- **Swagger Documentation** for all API endpoints
- **File Upload** support for pet images
- **Comprehensive Testing** with Mocha/Chai
- **Docker Support** with Docker Compose

### Frontend
- **Modern React SPA** with Vite
- **Material-UI** components for beautiful UI
- **React Router** for navigation
- **Form Validation** with React Hook Form + Yup
- **Context API** for state management
- **Responsive Design** mobile-first approach
- **E2E Testing** with Cypress
- **Unit Testing** with Jest

## 🏗️ Architecture

```
pet-adoption/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── dao/          # Data Access Objects
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── models/       # Mongoose schemas
│   │   ├── repository/   # Repository pattern
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utilities
│   │   └── test/         # Tests
│   └── Dockerfile
│
├── frontend/             # React SPA
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   ├── routes/       # Route configuration
│   │   └── utils/        # Utilities
│   └── cypress/          # E2E tests
│
└── .github/
    └── workflows/        # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 7+ (or use Docker)
- npm or yarn

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-adoption
   ```

2. **Start the backend with Docker Compose**
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **Install and start the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080
   - API Docs: http://localhost:8080/api-docs

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URL and JWT secret.

4. **Start MongoDB** (if not using Docker)
   ```bash
   mongod
   ```

5. **Run the backend**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

4. **Run the frontend**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

Once the backend is running, visit http://localhost:8080/api-docs for interactive Swagger documentation.

### Key Endpoints

#### Authentication
- `POST /api/sessions/register` - Register new user
- `POST /api/sessions/login` - Login
- `GET /api/sessions/current` - Get current user
- `POST /api/sessions/logout` - Logout

#### Users
- `GET /api/users` - List all users (admin)
- `GET /api/users/:uid` - Get user by ID
- `PUT /api/users/:uid` - Update user
- `DELETE /api/users/:uid` - Delete user

#### Pets
- `GET /api/pets` - List all pets
- `POST /api/pets` - Create pet (admin)
- `PUT /api/pets/:pid` - Update pet (admin)
- `DELETE /api/pets/:pid` - Delete pet (admin)

#### Adoptions
- `GET /api/adoptions` - List all adoptions (admin)
- `GET /api/adoptions/user` - Get user's adoptions
- `POST /api/adoptions/:uid/:pid` - Adopt a pet
- `DELETE /api/adoptions/:aid` - Delete adoption (admin)

## 🧪 Testing

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

# E2E tests (requires backend running)
npm run cypress:open
```

## 🔧 Environment Variables

### Backend (.env)

```env
MONGO_URL=mongodb://localhost:27017/petadoption
JWT_SECRET=your-secret-key-here
PORT=8080
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8080/api
```

## 📦 Deployment

### Backend Deployment

1. Build Docker image:
   ```bash
   cd backend
   docker build -t pet-adoption-api .
   ```

2. Run with environment variables:
   ```bash
   docker run -p 8080:8080 \
     -e MONGO_URL=your-mongo-url \
     -e JWT_SECRET=your-secret \
     pet-adoption-api
   ```

### Frontend Deployment

1. Build for production:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist/` folder to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting service

## 🔐 Security

- Passwords are hashed with bcrypt
- JWT tokens stored in HttpOnly cookies
- CORS configured for frontend origin
- Input validation on all endpoints
- Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Material-UI for the component library
- Express.js team for the excellent framework
- MongoDB for the database
- All contributors and users

## 📞 Support

For support, email support@petadoption.com or open an issue in the repository.

---

Made with ❤️ for pets and their future families
# pets-adoption
# pets-adoption
