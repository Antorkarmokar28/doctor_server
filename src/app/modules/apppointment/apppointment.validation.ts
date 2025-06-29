import { z } from 'zod';
import mongoose from 'mongoose';

const createAppointmentZodSchema = z.object({
  body: z.object({
    patient: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid patient ObjectId',
    }),
    doctor: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid doctor ObjectId',
    }),
    service: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid service ObjectId',
    }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    timeSlot: z.string().min(1, { message: 'Time slot is required' }),
    status: z
      .enum(['pending', 'accepted', 'cancelled', 'completed'])
      .optional()
      .default('pending'),
    notes: z.string().optional(),
  }),
});
const updateAppointmentZodSchema = z.object({
  body: z.object({
    patient: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid patient ObjectId',
      })
      .optional(),
    doctor: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid doctor ObjectId',
      })
      .optional(),
    service: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid service ObjectId',
      })
      .optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),
    timeSlot: z
      .string()
      .min(1, { message: 'Time slot is required' })
      .optional(),
    status: z
      .enum(['pending', 'accepted', 'cancelled', 'completed'])
      .optional()
      .default('pending')
      .optional(),
    notes: z.string().optional(),
  }),
});

export const AppointmentZodValidationSchema = {
  createAppointmentZodSchema,
  updateAppointmentZodSchema,
};
