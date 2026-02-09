import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center'
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />

        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          Página No Encontrada
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          La página que buscas no existe o ha sido movida.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Ir al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
