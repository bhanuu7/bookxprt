import axios from 'axios';
import { type EmployeeTableData } from '../components/EmployeeList/types';
export const updateEmployee = async (employee: EmployeeTableData) => {
  const response = await axios.put(
    `http://localhost:3000/employees/${employee.id}`,
    employee,
  );
  return response.data;
};
