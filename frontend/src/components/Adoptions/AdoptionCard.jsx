import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const AdoptionCard = ({ adoption }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <PetsIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" component="h3">
              {adoption.pet?.name || 'Unknown Pet'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {adoption.pet?.specie || 'Unknown Species'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarTodayIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Adopted on {formatDate(adoption.createdAt)}
          </Typography>
        </Box>

        {adoption.owner && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Owner: {adoption.owner.first_name} {adoption.owner.last_name}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Chip label="Adopted" color="success" size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdoptionCard;
