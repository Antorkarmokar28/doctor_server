import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DoctorServiceLayer } from './services.service';

const addDoctorService = catchAsync(async (req, res) => {
  const doctorId = req.user._id;
  const payload = { ...req.body, doctorId };
  const result = await DoctorServiceLayer.addDoctorServiceIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Doctor service created successfully',
    data: result,
  });
});

const updateDoctorService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  // Doctor ID comes from auth middleware
  const doctorId = req.user?._id;
  const payload = { ...req.body, doctorId };

  const result = await DoctorServiceLayer.updateDoctorServiceIntoDB(
    serviceId,
    payload
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteDoctorService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  // Logged-in doctor's ID from auth middleware
  const doctorId = req.user?._id;

  const result = await DoctorServiceLayer.deleteDoctorServiceFromDB(
    serviceId,
    doctorId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const DoctorServiceController = {
  addDoctorService,
  updateDoctorService,
  deleteDoctorService,
};
