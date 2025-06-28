import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.interface';
import { User } from '../modules/auth/auth.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Token Check
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Authorization token is missing'
      );
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
      console.log(error)
    }

    const { email, role } = decoded;

    // 🔍 Check if user exists
    const user = await User.isUserIsExitsByEmail(email);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    // 🔐 Check if user has required role
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not authorized to access this resource'
      );
    }

    // 🧾 Attach user info to request
    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  });
};

export default auth;
