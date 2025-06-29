import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentService } from './apppointment.service';

const bookAppointment = catchAsync(async (req, res) => {
  const patientId = req.user._id;
  const payload = { ...req.body, patientId };
  const result = await AppointmentService.createAppointmentIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Appointment booked successfully',
    data: result,
  });
});

export const AppoinmentController = {
  bookAppointment,
};
