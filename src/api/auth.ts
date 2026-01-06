import axios from 'axios';

export interface AuthError extends Error {
  status: number;
}

interface Payload {
  email: string;
  password: string;
}

export const login = async ({ email, password }: Payload): Promise<any> => {
  const response = await axios.get('http://localhost:3000/users', {
    params: { email },
  });
  console.log(password, response.data[0].password);
  const user = response.data[0];
  if (!user || user.password !== password) {
    const error = new Error('Invalid username or password') as AuthError;
    error.status = 401;
    throw error;
  }
  return user;
};

export const logout = async () => {
  localStorage.removeItem('isAuthenticated');
};
