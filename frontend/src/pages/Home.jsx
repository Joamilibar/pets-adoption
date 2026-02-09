import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <PetsIcon sx={{ fontSize: 60 }} />,
      title: 'Encuentra Tu Mascota',
      description: 'Explora nuestra colección de adorables mascotas que buscan un hogar lleno de amor.'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 60 }} />,
      title: 'Adopción Fácil',
      description: 'Proceso de adopción simple y directo para llevar a tu nuevo amigo a casa.'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 60 }} />,
      title: 'Únete a la Comunidad',
      description: 'Sé parte de nuestra comunidad de amantes de mascotas y adoptantes.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenido a Adopción de Mascotas
          </Typography>
          <Typography variant="h5" paragraph>
            Encuentra a tu compañero perfecto y dale un hogar lleno de amor
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            {isAuthenticated ? (
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                Ir al Panel
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                >
                  Comenzar
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          ¿Por Qué Elegirnos?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 6,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            ¿Listo para Hacer la Diferencia?
          </Typography>
          <Typography variant="body1" paragraph>
            Únete a miles de dueños felices que encontraron a su compañero perfecto a través de nuestra plataforma.
          </Typography>
          {!isAuthenticated && (
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Comienza Tu Camino
            </Button>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
