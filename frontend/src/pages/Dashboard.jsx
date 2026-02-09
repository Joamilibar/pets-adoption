import { useState } from 'react';
import { Container, Box, Tabs, Tab, Paper } from '@mui/material';
import PetList from '../components/Pets/PetList';
import PetManagement from '../components/Pets/PetManagement';
import AdoptionList from '../components/Adoptions/AdoptionList';
import UserProfile from '../components/Users/UserProfile';
import UsersTable from '../components/Users/UsersTable';
import { useAuth } from '../contexts/AuthContext';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isAdmin } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<PetsIcon />} label="Mascotas" iconPosition="start" />
          <Tab icon={<FavoriteIcon />} label="Mis Adopciones" iconPosition="start" />
          <Tab icon={<PersonIcon />} label="Perfil" iconPosition="start" />
          {isAdmin && (
            <Tab icon={<InventoryIcon />} label="Gestión Mascotas" iconPosition="start" />
          )}
          {isAdmin && (
            <Tab icon={<GroupIcon />} label="Usuarios" iconPosition="start" />
          )}
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tabValue} index={0}>
            <PetList />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <AdoptionList />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <UserProfile />
          </TabPanel>

          {isAdmin && (
            <TabPanel value={tabValue} index={3}>
              <PetManagement />
            </TabPanel>
          )}

          {isAdmin && (
            <TabPanel value={tabValue} index={4}>
              <UsersTable />
            </TabPanel>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;

