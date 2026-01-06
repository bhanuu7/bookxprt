import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Avatar,
  IconButton,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState, useRef } from 'react';
import { employeeSchema, type EmployeeFormValues } from './employee.schema';
import { INDIA_STATES } from '../../utils/constants';
import { addEmployee } from '../../api/addEmployee';
import { useMutation } from '@tanstack/react-query';
import { type EmployeeTableData } from './types';
import { updateEmployee } from '../../api/updateEmployee';
import { queryClient } from '../../query/client';

type Props = {
  employee?: EmployeeTableData | null;
  onSuccess?: () => void;
};

const AddEmployeeForm = ({ employee, onSuccess }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    employee?.image || '',
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee
      ? {
          fullName: employee.fullName,
          gender: employee.gender as 'male' | 'female',
          dateOfBirth: dayjs(employee.dateOfBirth),
          state: employee.state,
          status: employee.status as 'Active' | 'Inactive',
        }
      : {
          status: 'Active',
          gender: 'male',
        },
  });
  const mutation = useMutation({
    mutationFn: (payload: any) => addEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      onSuccess?.();
    },
  });

  const editEmployeeMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      onSuccess?.();
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setValue('image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setValue('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: EmployeeFormValues) => {
    const payload = {
      fullName: data.fullName,
      gender: data.gender,
      dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
      state: data.state,
      status: data.status,
      image: imagePreview,
    };
    console.log('Submitting payload:', payload);
    employee
      ? editEmployeeMutation.mutate({ ...employee, ...payload })
      : mutation.mutate(payload);
    reset();
    setImagePreview('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          mt: 1,
          bgcolor: 'background.default',
          borderStyle: 'dashed',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {imagePreview ? (
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={imagePreview}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'action.hover',
                  border: '2px dashed',
                  borderColor: 'divider',
                }}
              >
                <CloudUploadIcon
                  sx={{ fontSize: 48, color: 'action.active' }}
                />
              </Avatar>
            )}

            <Box sx={{ textAlign: 'center' }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="employee-image-upload"
              />
              <label htmlFor="employee-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  size="small"
                >
                  {imagePreview ? 'Change Photo' : 'Upload Photo'}
                </Button>
              </label>
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 1, color: 'text.secondary' }}
              >
                PNG, JPG up to 2MB
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" {...field}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Date of Birth"
            value={field.value}
            onChange={field.onChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                error: !!errors.dateOfBirth,
                helperText: errors.dateOfBirth?.message,
              },
            }}
          />
        )}
      />

      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.state}>
            <InputLabel>State</InputLabel>
            <Select label="State" {...field}>
              {INDIA_STATES.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.state?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select label="Status" {...field}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {employee ? 'Update Employee' : 'Save Employee'}
      </Button>
    </Box>
  );
};

export default AddEmployeeForm;
