import {
  Chip,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RowActions from './RowActions';
import { type EmployeeTableProps } from './types';

const EmployeeTable = ({
  isLoading,
  employees,
  openEditDialog,
}: EmployeeTableProps) => {
  if (isLoading) {
    return (
      <Paper>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Paper>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <Paper sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No employees found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or add a new employee
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ '&:hover': { bgcolor: 'action.hover' } }}
            >
              <TableCell>{employee.id}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={employee.image} sx={{ width: 40, height: 40 }}>
                    {!employee.image && <PersonIcon />}
                  </Avatar>
                  <Typography variant="body2">{employee.fullName}</Typography>
                </Box>
              </TableCell>
              <TableCell>{employee.dateOfBirth}</TableCell>
              <TableCell>{employee.state}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>
                {employee.gender}
              </TableCell>
              <TableCell>
                <Chip
                  label={employee.status}
                  color={employee.status === 'Active' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <RowActions
                  openEditDialog={openEditDialog}
                  employee={employee}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
