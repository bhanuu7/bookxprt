import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { InputTwoTone, Password } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  password: string;
}

const Login = () => {
  const [userCreds, setUserCreds] = useState<User>({ name: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  let navigate = useNavigate();
  const handleUserCredsChange = (updatedField: string, value: string) => {
    setUserCreds({ ...userCreds, [updatedField]: value });
  };
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    },
    retry: 1,
  });

  const handleSubmit = () => {
    mutation.mutate({
      email: userCreds.name,
      password: userCreds.password,
    });
  };
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        variant="elevation"
        sx={{
          borderRadius: 'rounded',
          padding: '20px',
        }}
      >
        <CardHeader
          title="Employee Management System"
          subheader="Sign in to access the dashboard"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            label="email"
            onChange={(e) =>
              handleUserCredsChange('email', e.target.value as string)
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            label="password"
            type={showPassword ? 'password' : 'text'}
            onChange={(e) =>
              handleUserCredsChange('password', e.target.value as string)
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <RemoveRedEyeIcon
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={handleSubmit}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
