import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useState } from 'react';
import { useEmployeeFilter } from './EmployeeFilterContext';
import { useDebounce } from '../../hooks/useDebounce';

const EmployeeFilters = () => {
  const {
    filters,
    setSearchQuery,
    setGenderFilter,
    setStatusFilter,
    clearFilters,
  } = useEmployeeFilter();

  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Update the context when debounced value changes
  useState(() => {
    setSearchQuery(debouncedSearchQuery);
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchQuery(value);
    setSearchQuery(value);
  };

  const handleClearFilters = () => {
    setLocalSearchQuery('');
    clearFilters();
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.gender !== 'all' ||
    filters.status !== 'all';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <TextField
        placeholder="Search by name..."
        value={localSearchQuery}
        onChange={handleSearchChange}
        size="small"
        sx={{ flexGrow: 1, minWidth: 250 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={filters.gender}
          label="Gender"
          onChange={(e) =>
            setGenderFilter(e.target.value as typeof filters.gender)
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) =>
            setStatusFilter(e.target.value as typeof filters.status)
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {hasActiveFilters && (
        <Tooltip title="Clear all filters">
          <IconButton
            onClick={handleClearFilters}
            size="small"
            color="default"
            sx={{ ml: 'auto' }}
          >
            <FilterAltOffIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default EmployeeFilters;
