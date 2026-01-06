import { Box, Typography, Avatar, Divider, Grid } from '@mui/material';
import { forwardRef } from 'react';
import { type EmployeeTableData } from './types';

type Props = {
  employee: EmployeeTableData;
};

const PrintableEmployeeCard = forwardRef<HTMLDivElement, Props>(
  ({ employee }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          p: 4,
          maxWidth: 800,
          mx: 'auto',
          '@media print': {
            p: 2,
          },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Employee Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Employee ID: {employee.id}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Avatar
            src={employee.image}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: '3px solid',
              borderColor: 'divider',
            }}
          />
          <Typography variant="h5" gutterBottom>
            {employee.fullName}
          </Typography>
          <Typography
            variant="body1"
            color={employee.status === 'Active' ? 'success.main' : 'error.main'}
            fontWeight="medium"
          >
            {employee.status}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Gender
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                {employee.gender}
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Date of Birth
              </Typography>
              <Typography variant="body1">{employee.dateOfBirth}</Typography>
            </Box>
          </Grid>

          <Grid>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                State
              </Typography>
              <Typography variant="body1">{employee.state}</Typography>
            </Box>
          </Grid>

          <Grid>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Status
              </Typography>
              <Typography variant="body1">{employee.status}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" color="text.secondary">
            Printed on {new Date().toLocaleDateString()} at{' '}
            {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>
    );
  },
);

PrintableEmployeeCard.displayName = 'PrintableEmployeeCard';

export default PrintableEmployeeCard;
