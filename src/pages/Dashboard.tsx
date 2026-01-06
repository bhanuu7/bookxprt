import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import ToggleButtonGroupComponent from '../components/Dashboard/ToggleButtonGroupComponent';
import EmployeeList from '../components/EmployeeList';
import { useState } from 'react';
const Dashboard = () => {
  const [view, setView] = useState<string>('Dashboard');
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employment Management
          </Typography>
          <Button color="inherit" variant="text">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <ToggleButtonGroupComponent view={view} setView={setView} />
      {view === 'Dashboard' ? <DashboardOverview /> : <EmployeeList />}
    </Box>
  );
};

export default Dashboard;
