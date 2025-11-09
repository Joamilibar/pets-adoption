# Pet Adoption Frontend

Modern React SPA for the Pet Adoption platform built with Vite, Material-UI, and React Router.

## Features

- **User Authentication**: Register, login, and logout with JWT cookies
- **Pet Browsing**: View and search available pets for adoption
- **Adoption Management**: Adopt pets and view adoption history
- **User Profile**: View and manage user information
- **Admin Panel**: Manage users (admin only)
- **Responsive Design**: Mobile-first design with Material-UI
- **Form Validation**: Client-side validation with react-hook-form and Yup

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **UI Library**: Material-UI (MUI) 5
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Yup
- **State Management**: React Context API
- **Testing**: Jest + React Testing Library + Cypress

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running (see backend README)

## Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-adoption/frontend
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
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5173 in your browser

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:run` - Run Cypress tests headlessly

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.js              # Axios instance and API methods
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx          # Login form
│   │   │   └── Register.jsx       # Registration form
│   │   ├── Layout/
│   │   │   ├── Header.jsx         # App header with navigation
│   │   │   └── ProtectedRoute.jsx # Route guard component
│   │   ├── Pets/
│   │   │   ├── PetCard.jsx        # Pet display card
│   │   │   └── PetList.jsx        # Pet listing with filters
│   │   ├── Users/
│   │   │   ├── UserProfile.jsx    # User profile display
│   │   │   └── UsersTable.jsx     # Admin user management
│   │   └── Adoptions/
│   │       ├── AdoptionCard.jsx   # Adoption display card
│   │       └── AdoptionList.jsx   # User's adoptions list
│   ├── contexts/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Dashboard.jsx          # Main dashboard with tabs
│   │   └── NotFound.jsx           # 404 page
│   ├── routes/
│   │   └── index.jsx              # Route configuration
│   ├── utils/
│   │   └── validators.js          # Form validation schemas
│   ├── App.jsx                    # Root component
│   └── main.jsx                   # Entry point
├── cypress/
│   └── e2e/
│       └── auth.cy.js             # E2E tests
├── public/
│   └── index.html                 # HTML template
├── .env.example                   # Environment template
├── vite.config.js                 # Vite configuration
├── jest.config.js                 # Jest configuration
├── cypress.config.js              # Cypress configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Features Guide

### Authentication

The app uses JWT tokens stored in HttpOnly cookies for authentication:

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Auto-login**: The app checks authentication status on load
4. **Logout**: Clear session from any page

### Pet Adoption

1. Browse available pets on the dashboard
2. Use filters to search by name, species, or adoption status
3. Click "Adopt Me" on any available pet
4. View your adopted pets in the "My Adoptions" tab

### User Roles

- **User**: Can view pets, adopt pets, and manage their profile
- **Admin**: Has all user permissions plus user management access

## API Integration

The frontend communicates with the backend API using Axios. The base URL is configured via the `VITE_API_URL` environment variable.

### API Client

The API client (`src/api/client.js`) includes:
- Automatic cookie handling
- Request/response interceptors
- Error handling with automatic redirect on 401
- Typed API methods for all endpoints

### Available API Methods

```javascript
// Auth
api.register(data)
api.login(data)
api.logout()
api.getCurrentUser()

// Users
api.getAllUsers()
api.getUserById(id)
api.updateUser(id, data)
api.deleteUser(id)

// Pets
api.getAllPets()
api.getPetById(id)
api.createPet(data)
api.updatePet(id, data)
api.deletePet(id)

// Adoptions
api.getAllAdoptions()
api.getUserAdoptions()
api.createAdoption(userId, petId)
api.deleteAdoption(id)
```

## Testing

### Unit Tests (Jest)

Run unit tests with:
```bash
npm test
```

Tests are located in `src/**/*.test.jsx` files.

### E2E Tests (Cypress)

1. Start the backend and frontend servers
2. Run Cypress tests:
   ```bash
   # Interactive mode
   npm run cypress:open

   # Headless mode
   npm run cypress:run
   ```

Tests cover:
- User registration and login
- Pet browsing and adoption
- Profile management
- Logout flow

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

The build output will be in the `dist/` directory.

## Deployment

### Netlify / Vercel

1. Connect your repository to Netlify or Vercel
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Manual Deployment

1. Build the application: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure your server to serve `index.html` for all routes (SPA routing)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/api` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Issues

If you encounter CORS errors:
1. Ensure the backend is running
2. Check that `VITE_API_URL` points to the correct backend URL
3. Verify the backend CORS configuration allows your frontend origin

### Authentication Issues

If authentication doesn't work:
1. Clear browser cookies
2. Check that the backend JWT_SECRET is set
3. Verify cookies are being sent with requests (check Network tab)

### Build Issues

If the build fails:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `rm -rf node_modules/.vite`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT
