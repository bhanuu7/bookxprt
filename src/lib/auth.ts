export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem('isAuthenticated'));
};
