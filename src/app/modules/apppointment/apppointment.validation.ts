import { z } from 'zod';
import mongoose from 'mongoose';


export const createAppointmentZodSchema = z.object({
  body: z.object({
    patient: z.string({ required_error: 'Patient is required' }),
    doctor: z.string({ required_error: 'Doctor is required' }),
    service: z.string({ required_error: 'Service is required' }),
    date: z.string({ required_error: 'Date is required' }),
    timeSlot: z.string({ required_error: 'TimeSlot must be a string' }), // ❌ problem here
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
