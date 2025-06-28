/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_Role } from './user.constant';

export interface IUser {
  _id?: string;
  role: 'doctor' | 'patient' | 'admin';
  name: string;
  email: string;
  phone?: string;
  password: string;
  specialization?: string;
  hospitalName?: string;
  hospitalFloor?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
}

export interface UserModel extends Model<IUser> {
  isUserIsExitsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    planePassword: string,
    hashedPassword: string
  ): Promise<IUser>;
}

export type TUserRole = keyof typeof User_Role;
