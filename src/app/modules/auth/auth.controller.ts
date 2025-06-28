import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';

const registrationDoctor = catchAsync(async (req, res) => {
  const result = await AuthService.doctorRegisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Doctor registration is successfully',
    data: result,
  });
});

const registrationPatient = catchAsync(async (req, res) => {
  const result = await AuthService.patientRegisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Patient registration is successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthService.userloginIntoDB(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login is successfully',
    data: {
      accessToken,
    },
  });
});

export const AuthController = {
  registrationDoctor,
  registrationPatient,
  userLogin,
};
