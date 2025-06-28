import { z } from 'zod';

const doctorRegistrationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    specialization: z.string(),
    hospitalName: z.string(),
    hospitalFloor: z.string().optional(),
    phone: z.string().optional(),
  }),
});

const patientRegistrationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    age: z.number(),
    gender: z.enum(['male', 'female', 'other']),
    phone: z.string().optional(),
  }),
});

export const AtuhValidationSchema = {
  doctorRegistrationSchema,
  patientRegistrationSchema,
};
