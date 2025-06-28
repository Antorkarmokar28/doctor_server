import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { ILoginUser, IUser } from './auth.interface';
import { User } from './auth.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
// Register a new user with doctor role
const doctorRegisterIntoDB = async (payload: Partial<IUser>) => {
  const { email } = payload;
  const isExistingUser = await User.findOne({ email });
  // Check if user already exists
  if (isExistingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'This email already use');
  }
  // Create new doctor
  const result = await User.create({
    ...payload,
    role: 'doctor',
  });
  return result;
};
// Register a new user with patient role
const patientRegisterIntoDB = async (payload: Partial<IUser>) => {
  const { email } = payload;
  const isExistingUser = await User.findOne({ email });
  // Check if user already exists
  if (isExistingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'This email already use');
  }
  // Create new patient
  const result = await User.create({
    ...payload,
    role: 'patient',
  });
  return result;
};

export const userloginIntoDB = async (payload: ILoginUser) => {
  // Find user by email
  const user = await User.isUserIsExitsByEmail(payload.email);

  // Check if user exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  // Check if password matches
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
  }

  // JWT Payload
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  // Create Access Token
  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn:'7d',
    }
  );

  // Create Refresh Token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  doctorRegisterIntoDB,
  patientRegisterIntoDB,
  userloginIntoDB
};
