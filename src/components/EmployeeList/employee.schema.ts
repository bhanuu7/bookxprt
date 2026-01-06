import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';

export const employeeSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.custom<Dayjs>(
    (val) => dayjs.isDayjs(val),
    'Date of birth is required',
  ),
  state: z.string().min(1, 'State is required'),
  status: z.enum(['Active', 'Inactive']),
  image: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
