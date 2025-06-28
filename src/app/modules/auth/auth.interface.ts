/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
import { User_Role } from './auth.constant';

export type UserRole = 'doctor' | 'patient' | 'admin';

export interface IUser extends Document {
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  password: string;
  specialization?: string;
  hospitalName?: string;
  hospitalFloor?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface UserModel extends Model<IUser> {
  isUserIsExitsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    planePassword: string,
    hashedPassword: string
  ): Promise<IUser>;
}

export type TUserRole = keyof typeof User_Role;
