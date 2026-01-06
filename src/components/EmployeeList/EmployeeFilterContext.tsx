import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  EmployeeTableData,
  FilterState,
  EmployeeFilterContextType,
} from './types';

const EmployeeFilterContext = createContext<
  EmployeeFilterContextType | undefined
>(undefined);

const initialFilters: FilterState = {
  searchQuery: '',
  gender: 'all',
  status: 'all',
};

export const EmployeeFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const setGenderFilter = (gender: FilterState['gender']) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const setStatusFilter = (status: FilterState['status']) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const filterEmployees = useMemo(
    () => (employees: EmployeeTableData[]) => {
      if (!employees) return [];

      return employees.filter((employee) => {
        const matchesSearch = filters.searchQuery
          ? employee.fullName
              .toLowerCase()
              .includes(filters.searchQuery.toLowerCase())
          : true;

        const matchesGender =
          filters.gender === 'all' || employee.gender === filters.gender;

        const matchesStatus =
          filters.status === 'all' || employee.status === filters.status;

        return matchesSearch && matchesGender && matchesStatus;
      });
    },
    [filters],
  );

  const value = {
    filters,
    setSearchQuery,
    setGenderFilter,
    setStatusFilter,
    clearFilters,
    filterEmployees,
  };

  return (
    <EmployeeFilterContext.Provider value={value}>
      {children}
    </EmployeeFilterContext.Provider>
  );
};

export const useEmployeeFilter = () => {
  const context = useContext(EmployeeFilterContext);
  if (context === undefined) {
    throw new Error(
      'useEmployeeFilter must be used within EmployeeFilterProvider',
    );
  }
  return context;
};
