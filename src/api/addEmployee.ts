import axios from 'axios';
export const addEmployee = async (payload: any): Promise<any[]> => {
  const response = await axios.post('http://localhost:3000/employees', payload);
  return response.data;
};
