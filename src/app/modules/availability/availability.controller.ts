import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AvailabilityService } from './availability.service';

const createAvailability = catchAsync(async (req, res) => {
  const doctorId = req.user._id;
  const payload = { ...req.body, doctorId };
  const result = await AvailabilityService.createAvailabilityIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Availability created successfully',
    data: result,
  });
});

const getDoctorAvailability = catchAsync(async (req, res) => {
  const doctorId = req.params.doctorId || req.user._id;
  const result = await AvailabilityService.getDoctorAvailabilityFromDB(
    doctorId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Availability retrieved successfully',
    data: result,
  });
});

const updateDoctorAvailability = catchAsync(async (req, res) => {
  const { doctorId } = req.params;
  const result = await AvailabilityService.updateAvailabilityIntoDB(
    doctorId,
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Availability updated successfully',
    data: result,
  });
});

export const AvailabilityController = {
  createAvailability,
  getDoctorAvailability,
  updateDoctorAvailability,
};
