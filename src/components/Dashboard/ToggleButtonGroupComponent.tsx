import { ToggleButton, Box, ToggleButtonGroup } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const ToggleButtonGroupComponent = ({
  view,
  setView,
}: {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newView) => newView && setView(newView)}
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiToggleButton-root': {
            border: 'none',
            py: 1.5,
            px: 3,
          },
        }}
      >
        <ToggleButton
          value="Dashboard"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            gap: 1,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
        >
          <DashboardIcon fontSize="small" />
          Dashboard
        </ToggleButton>

        <ToggleButton
          value="Employees"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            gap: 1,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
        >
          <PeopleIcon fontSize="small" />
          Employees
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleButtonGroupComponent;
