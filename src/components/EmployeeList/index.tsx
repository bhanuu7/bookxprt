import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { getEmployees } from '../../api/getEmployees';
import { useQuery } from '@tanstack/react-query';
import AddEmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import {
  EmployeeFilterProvider,
  useEmployeeFilter,
} from './EmployeeFilterContext';
import EmployeeFilters from './EmployeeFilters';

const EmployeeListContent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  const { filterEmployees } = useEmployeeFilter();
  const [employees, setEmployees] = useState<any[] | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState<any[] | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  useEffect(() => {
    if (data) {
      setEmployees(data);
      setFilteredEmployees(filterEmployees(data));
    }
  }, [data, filterEmployees]);

  const handleOpenDialog = (employee?: any) => {
    setSelectedEmployee(employee || null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h6">Employee List</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your team members
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Add Employee
        </Button>
      </Box>

      {/* Filters */}
      <EmployeeFilters />

      {/* Table */}
      <EmployeeTable
        employees={filteredEmployees}
        isLoading={isLoading}
        openEditDialog={handleOpenDialog}
      />

      {/* Add Employee Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 5 }}>
          {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <AddEmployeeForm
            employee={selectedEmployee}
            onSuccess={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const EmployeeList = () => {
  return (
    <EmployeeFilterProvider>
      <EmployeeListContent />
    </EmployeeFilterProvider>
  );
};

export default EmployeeList;
