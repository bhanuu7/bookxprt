import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import ToggleButtonGroupComponent from '../components/Dashboard/ToggleButtonGroupComponent';
import EmployeeList from '../components/EmployeeList';
import { useState } from 'react';
import { logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [view, setView] = useState<string>('Dashboard');
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        bgcolor: 'grey.50',
        overflow: 'hidden',
      }}
    >
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Employee Management System
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroupComponent view={view} setView={setView} />
        </Box>
        <Box>
          {view === 'Dashboard' ? <DashboardOverview /> : <EmployeeList />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
