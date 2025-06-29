import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { IDoctorService } from './services.interface';
import { DoctorService } from './services.model';

const addDoctorServiceIntoDB = async (payload: IDoctorService) => {
  // create doctor service
  const service = await DoctorService.create(payload);
  return service;
};

const updateDoctorServiceIntoDB = async (
  id: string,
  payload: Partial<IDoctorService>
) => {
  const service = await DoctorService.findById(id);

  if (!service) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Sorry, this service was not found!'
    );
  }

  // Optional: Ensure the service belongs to the requesting doctor
  if (
    payload.doctorId &&
    service.doctorId.toString() !== payload.doctorId.toString()
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this service!'
    );
  }

  const updated = await DoctorService.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updated;
};

const deleteDoctorServiceFromDB = async (id: string, doctorId: string) => {
  const service = await DoctorService.findById(id);

  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found!');
  }

  // Check if the service belongs to the logged-in doctor
  if (service.doctorId.toString() !== doctorId.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this service!'
    );
  }

  const result = await DoctorService.findByIdAndDelete(id);
  return result; // return deleted ID (optional)
};

export const DoctorServiceLayer = {
  addDoctorServiceIntoDB,
  updateDoctorServiceIntoDB,
  deleteDoctorServiceFromDB,
};
