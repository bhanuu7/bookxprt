export interface EmployeeTableData {
  id?: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  state: string;
  status: string;
  image: string;
}

export interface EmployeeTableProps {
  isLoading: boolean;
  employees: EmployeeTableData[] | null;
  openEditDialog: (employee?: EmployeeTableData) => void;
}

export interface RowActionsProps {
  openEditDialog: (employee?: EmployeeTableData) => void;
  employee: EmployeeTableData;
}

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?:
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning';
};

export type FilterState = {
  searchQuery: string;
  gender: 'all' | 'male' | 'female';
  status: 'all' | 'Active' | 'Inactive';
};

export type EmployeeFilterContextType = {
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setGenderFilter: (gender: FilterState['gender']) => void;
  setStatusFilter: (status: FilterState['status']) => void;
  clearFilters: () => void;
  filterEmployees: (employees: EmployeeTableData[]) => EmployeeTableData[];
};
