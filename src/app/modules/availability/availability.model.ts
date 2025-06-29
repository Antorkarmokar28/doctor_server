import mongoose, { model, Schema } from 'mongoose';
import { IAvailability, ITimeSlot } from './availability.interface';

const timeSlotSchema = new Schema<ITimeSlot>({
  start: { type: String, required: true }, // Format: "HH:MM"
  end: { type: String, required: true },
});

const availabilitySchema = new Schema<IAvailability>(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async function (value) {
          const user = await mongoose.model('User').findById(value);
          return user && user.role === 'doctor';
        },
        message: 'Doctor ID must reference a user with doctor role',
      },
    },
    day: {
      type: String,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      required: true,
    },
    slots: [timeSlotSchema],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Availability = model<IAvailability>('Availability', availabilitySchema);
