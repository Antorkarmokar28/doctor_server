import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../auth/auth.model';
import { IAvailability } from './availability.interface';
import { Availability } from './availability.model';

const createAvailabilityIntoDB = async (payload: Partial<IAvailability>) => {
  // Validate doctor role
  const user = await User.findById(payload.doctorId);
  if (!user || user.role !== 'doctor') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid doctor ID');
  }

  const existingAvailability = await Availability.findOne({
    doctorId: payload.doctorId,
    day: payload.day,
  });

  if (existingAvailability) {
    existingAvailability.slots = payload.slots || [];
    existingAvailability.isAvailable = true;
    return await existingAvailability.save();
  }

  return await Availability.create(payload);
};

const getDoctorAvailabilityFromDB = async (doctorId: string) => {
  const result = await Availability.find({ doctorId });
  return result;
};

const updateAvailabilityIntoDB = async (
  id: string,
  payload: Partial<IAvailability>
) => {
  return await Availability.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const AvailabilityService = {
  createAvailabilityIntoDB,
  getDoctorAvailabilityFromDB,
  updateAvailabilityIntoDB,
};
