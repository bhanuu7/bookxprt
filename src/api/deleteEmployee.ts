import axios from 'axios';

export const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`http://localhost:3000/employees/${id}`);
  return response.data;
};
