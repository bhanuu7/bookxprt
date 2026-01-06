import axios from 'axios';
export const getEmployees = async (): Promise<any[]> => {
  const response = await axios.get('http://localhost:3000/employees');
  return response.data;
};
