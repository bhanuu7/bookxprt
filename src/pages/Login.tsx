import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  InputAdornment,
  TextField,
  Alert,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
}

interface ValidationErrors {
  email: string;
  password: string;
}

const Login = () => {
  const [userCreds, setUserCreds] = useState<User>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState<string>('');
  const navigate = useNavigate();

  const handleUserCredsChange = (updatedField: string, value: string) => {
    setUserCreds({ ...userCreds, [updatedField]: value });
    // Clear field-specific error when user starts typing
    if (errors[updatedField as keyof ValidationErrors]) {
      setErrors({ ...errors, [updatedField]: '' });
    }
    // Clear API error when user modifies input
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = { email: '', password: '' };
    let isValid = true;

    if (!userCreds.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCreds.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!userCreds.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      localStorage.setItem('isAuthenticated', 'true');
      setApiError('');
      navigate('/');
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'An error occurred during login';
      setApiError(errorMessage);
    },
    retry: 1,
  });

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    mutation.mutate({
      email: userCreds.email,
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
        bgcolor: 'grey.50',
        p: 2,
      }}
    >
      <Card
        elevation={3}
        sx={{
          maxWidth: 450,
          width: '100%',
          borderRadius: 2,
        }}
      >
        <CardHeader
          title="Employee Management System"
          subheader="Sign in to access the dashboard"
          sx={{
            textAlign: 'center',
            pb: 1,
            '& .MuiCardHeader-title': {
              fontSize: '1.5rem',
              fontWeight: 600,
            },
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            px: 3,
            pt: 2,
            pb: 1,
          }}
        >
          {apiError && (
            <Alert severity="error" onClose={() => setApiError('')}>
              {apiError}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={userCreds.email}
            onChange={(e) => handleUserCredsChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={userCreds.password}
            onChange={(e) => handleUserCredsChange('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      component="span"
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon color="action" />
                      ) : (
                        <RemoveRedEyeIcon color="action" />
                      )}
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </CardContent>
        <CardActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
