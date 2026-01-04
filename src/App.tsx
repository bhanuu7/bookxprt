import { useEffect } from 'react';
import { login } from './api/auth';
import { useMutation } from '@tanstack/react-query';
function App() {
  const mutation = useMutation({
    mutationFn: login,
    retry: 1,
    onSuccess(data, variables, onMutateResult, context) {
      console.log('mutation success');
    },
  });
  const handleSubmit = () => {
    mutation.mutate({
      email: 'bhanu@gmail.com',
      password: '123456',
    });
  };
  return (
    <div>
      <h5>Hello world</h5>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
