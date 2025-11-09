# Pet Adoption Backend

REST API for managing users, pets, and adoptions built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based authentication with HttpOnly cookies
- **User Management**: CRUD operations for users with role-based access control
- **Pet Management**: CRUD operations for pets with image upload support
- **Adoption System**: Create and manage pet adoptions
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Docker Support**: Containerized deployment with Docker Compose

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4.18
- **Database**: MongoDB 8.x with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Documentation**: Swagger (swagger-jsdoc + swagger-ui-express)
- **File Upload**: Multer
- **Testing**: Mocha + Chai + Supertest

## Prerequisites

- Node.js 18 or higher
- MongoDB 7 or higher (or use Docker Compose)
- npm or yarn

## Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pet-adoption/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your values:

   ```env
   MONGO_URL=mongodb://localhost:27017/petadoption
   JWT_SECRET=your-secret-key-here
   PORT=3000
   ```

4. **Start MongoDB** (if not using Docker)

   ```bash
   mongod
   ```

5. **Run the application**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the API**
   - API: http://localhost:3000
   - Swagger Docs: http://localhost:3000/api-docs

### Docker Deployment

1. **Start all services**

   ```bash
   docker-compose up -d
   ```

2. **View logs**

   ```bash
   docker-compose logs -f
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

## API Endpoints

### Authentication (`/api/sessions`)

- `POST /api/sessions/register` - Register a new user
- `POST /api/sessions/login` - Login and receive JWT cookie
- `GET /api/sessions/current` - Get current user (requires auth)
- `POST /api/sessions/logout` - Logout and clear cookie

### Users (`/api/users`)

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:uid` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:uid` - Update user
- `DELETE /api/users/:uid` - Delete user

### Pets (`/api/pets`)

- `GET /api/pets` - Get all pets (public)
- `GET /api/pets/:pid` - Get pet by ID
- `POST /api/pets` - Create a new pet (admin only)
- `PUT /api/pets/:pid` - Update pet (admin only)
- `DELETE /api/pets/:pid` - Delete pet (admin only)
- `POST /api/pets/:pid/image` - Upload pet image (admin only)

### Adoptions (`/api/adoptions`)

- `GET /api/adoptions` - Get all adoptions (admin only)
- `GET /api/adoptions/user` - Get current user's adoptions
- `GET /api/adoptions/:aid` - Get adoption by ID
- `POST /api/adoptions/:uid/:pid` - Create adoption (adopt a pet)
- `DELETE /api/adoptions/:aid` - Delete adoption (admin only)

## Testing

Run the test suite:

```bash
npm test
```

The tests use Mocha and Chai with Supertest for API testing.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/             # Request handlers
│   │   ├── adoptions.controller.js
│   │   ├── pets.controller.js
│   │   ├── sessions.controller.js
│   │   └── users.controller.js
│   ├── dao/                     # Data Access Objects
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── Adoption.js
│   │   │   ├── Pet.js
│   │   │   └── User.js
│   │   ├── Adoption.dao.js
│   │   ├── Pets.dao.js
│   │   └── Users.dao.js
│   ├── dto/                     # Data Transfer Objects
│   │   └── User.dto.js
│   ├── repository/              # Repository pattern
│   │   ├── AdoptionRepository.js
│   │   ├── GenericRepository.js
│   │   ├── PetRepository.js
│   │   └── UserRepository.js
│   ├── routes/                  # Express routers
│   │   ├── adoption.router.js
│   │   ├── pets.router.js
│   │   ├── sessions.router.js
│   │   └── users.router.js
│   ├── services/                # Service layer
│   │   └── index.js
│   ├── test/                    # Test files
│   │   └── adoption.router.test.js
│   ├── utils/                   # Utilities
│   │   ├── index.js             # Auth helpers
│   │   └── swagger.js           # Swagger config
│   ├── app.js                   # Express app setup
│   └── index.js                 # App export
├── uploads/                     # Uploaded files
├── .env.example                 # Environment template
├── Dockerfile                   # Docker image
├── docker-compose.yml           # Docker services
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Environment Variables

| Variable       | Description                | Default                                 |
| -------------- | -------------------------- | --------------------------------------- |
| `MONGO_URL`    | MongoDB connection string  | `mongodb://localhost:27017/petadoption` |
| `JWT_SECRET`   | Secret key for JWT signing | Required                                |
| `PORT`         | Server port                | `3000`                                  |
| `FRONTEND_URL` | Frontend URL for CORS      | `http://localhost:5173`                 |
| `NODE_ENV`     | Environment mode           | `development`                           |

## Authentication

The API uses JWT tokens stored in HttpOnly cookies named `coderCookie`. The token expires after 1 hour.

### Login Flow

1. POST credentials to `/api/sessions/login`
2. Receive JWT in `coderCookie` cookie
3. Include cookie in subsequent requests
4. Use `/api/sessions/current` to verify authentication

### Role-Based Access

- **User**: Can view pets, adopt pets, manage own profile
- **Admin**: Full access to all resources

## Error Handling

All errors return JSON with an `error` field:

```json
{
  "error": "Error message here"
}
```

HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT
