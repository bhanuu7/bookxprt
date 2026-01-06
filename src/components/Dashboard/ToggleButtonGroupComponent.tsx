import { ToggleButton, Box, ToggleButtonGroup } from '@mui/material';

const ToggleButtonGroupComponent = ({
  view,
  setView,
}: {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Box>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newView) => newView && setView(newView)}
        sx={{
          backgroundColor: '#e0e0e0',
          padding: '2px',
          borderRadius: '10px',
        }}
      >
        <ToggleButton
          value="Dashboard"
          sx={{
            border: 'none',
            borderRadius: '10px',
            textTransform: 'none',
            //px: 2,
            '&.Mui-selected': {
              backgroundColor: '#ffffff',
              color: '#000',
              boxShadow: 1,
              outline: 'none',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          Dashboard
        </ToggleButton>

        <ToggleButton
          value="Employees"
          sx={{
            border: 'none',
            borderRadius: '10px',
            textTransform: 'none',
            px: 2,
            '&.Mui-selected': {
              backgroundColor: '#ffffff',
              color: '#000',
              boxShadow: 1,
              outline: 'none',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          Employees
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleButtonGroupComponent;
