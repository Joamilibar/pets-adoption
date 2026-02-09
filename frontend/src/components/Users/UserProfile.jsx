import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            mr: 3
          }}
        >
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Box>
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          {user.role === 'admin' && (
            <Chip
              icon={<AdminPanelSettingsIcon />}
              label="Administrador"
              color="primary"
              size="small"
            />
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Correo Electrónico
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Rol
          </Typography>
          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
          </Typography>
        </Box>
      </Box>

      {user.pets && user.pets.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Mascotas Adoptadas
          </Typography>
          <Typography variant="h6">{user.pets.length}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default UserProfile;
