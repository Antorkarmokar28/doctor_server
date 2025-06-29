import { z } from 'zod';

const createDoctorServiceZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().optional(),
    price: z.number({ required_error: 'Price is required' }),
    duration: z.number({ required_error: 'Duration is required' }),
  }),
});

const updateDoctorServiceZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    description: z.string().optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    duration: z.number({ required_error: 'Duration is required' }).optional(),
  }),
});

export const DoctorServiceZodValidationSchema = {
  createDoctorServiceZodSchema,
  updateDoctorServiceZodSchema,
};
