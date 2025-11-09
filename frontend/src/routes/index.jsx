import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Layout/Header';
import ProtectedRoute from '../components/Layout/ProtectedRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'grey.200',
            textAlign: 'center'
          }}
        >
          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
            © {new Date().getFullYear()} Pet Adoption Platform. All rights reserved.
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default AppRoutes;
