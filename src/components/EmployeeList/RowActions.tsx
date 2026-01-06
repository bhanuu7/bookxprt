import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import { useState, useRef } from 'react';
import { type RowActionsProps } from './types';
import { useMutation } from '@tanstack/react-query';
import { deleteEmployee } from '../../api/deleteEmployee';
import { queryClient } from '../../query/client';
import ConfirmDialog from './ConfirmDialog';
import { useReactToPrint } from 'react-to-print';
import PrintableEmployeeCard from './PrintableEmployeeCard';

const RowActions = ({ openEditDialog, employee }: RowActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const open = Boolean(anchorEl);

  const mutation = useMutation({
    mutationFn: () => deleteEmployee(employee.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Employee_${employee.fullName}_${employee.id}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    mutation.mutate();
    setConfirmOpen(false);
  };

  const handlePrintClick = () => {
    setAnchorEl(null);
    handlePrint();
  };

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            openEditDialog(employee);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <MenuItem onClick={handlePrintClick}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
      </Menu>

      {/* Hidden Printable Component */}
      <div style={{ display: 'none' }}>
        <PrintableEmployeeCard ref={printRef} employee={employee} />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.fullName}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </>
  );
};

export default RowActions;
