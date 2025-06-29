import mongoose, { model, Schema } from 'mongoose';
import { IAppointment } from './appointment.interface';
const appointmentSchema = new Schema<IAppointment>(
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
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async function (value) {
          const user = await mongoose.model('User').findById(value);
          return user && user.role === 'patient';
        },
        message: 'Patient ID must reference a user with patient role',
      },
    },
    service: {
      type: String,
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Appointment = model<IAppointment>(
  'Appointment',
  appointmentSchema
);
