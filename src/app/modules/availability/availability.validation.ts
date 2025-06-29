import { z } from 'zod';
const createAvailabilityZodSchema = z.object({
  body: z.object({
    day: z.enum([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]),

    slots: z.array(
      z.object({
        start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: 'Invalid start time format (HH:MM)',
        }),
        end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: 'Invalid end time format (HH:MM)',
        }),
      })
    ),

    isAvailable: z.boolean().optional(),
  }),
});

const updateAvailabilityZodSchema = z.object({
  body: z.object({
    day: z
      .enum([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ])
      .optional(),

    slots: z
      .array(
        z.object({
          start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: 'Invalid start time format (HH:MM)',
          }),
          end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: 'Invalid end time format (HH:MM)',
          }),
        })
      )
      .optional(),

    isAvailable: z.boolean().optional(),
  }),
});


export const availabilityZodValidationSchema = {
  createAvailabilityZodSchema,
  updateAvailabilityZodSchema,
};
