import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../auth/auth.model';
import { IAppointment } from './appointment.interface';
import { AvailabilityService } from '../availability/availability.service';
import { Appointment } from './apppointment.model';

const createAppointmentIntoDB = async (payload: Partial<IAppointment>) => {
  // Validate doctor and patient roles
  const [doctor, patient] = await Promise.all([
    User.findById(payload.doctorId),
    User.findById(payload.patientId),
  ]);

  if (!doctor || doctor.role !== 'doctor') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid doctor ID');
  }
  if (!patient || patient.role !== 'patient') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid patient ID');
  }

  // Ensure date is provided
  if (!payload.date) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Appointment date is required');
  }

  // Get day of the week from date
  const day = new Date(payload.date).toLocaleDateString('en-US', {
    weekday: 'long',
  });

  // Check slot availability
  const isAvailable = await AvailabilityService.checkSlotAvailability(
    payload.doctorId as string,
    day,
    payload.timeSlot!
  );

  if (!isAvailable) {
    throw new Error('Selected time slot is not available');
  }

  // Check for existing appointment
  const existingAppointment = await Appointment.findOne({
    doctorId: payload.doctorId,
    date: payload.date,
    'timeSlot.start': payload?.timeSlot?.start,
    status: { $in: ['pending', 'accepted'] },
  });

  if (existingAppointment) {
    throw new Error('This time slot is already booked');
  }

  return await Appointment.create(payload);
};

export const AppointmentService = {
  createAppointmentIntoDB,
};
