import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          component={Link}
          to="/"
          sx={{ mr: 2 }}
        >
          <PetsIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Adopción de Mascotas
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Typography variant="body2" sx={{ mr: 1 }}>
                ¡Bienvenido, {user?.first_name}!
              </Typography>

              <Button
                color="inherit"
                startIcon={<DashboardIcon />}
                component={Link}
                to="/dashboard"
              >
                Panel
              </Button>

              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Iniciar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
