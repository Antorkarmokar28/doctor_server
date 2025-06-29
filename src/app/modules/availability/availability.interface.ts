import { IUser } from '../auth/auth.interface';

export interface ITimeSlot {
  start: string; // Format: "HH:MM"
  end: string;
}

export interface IAvailability {
  _id: string;
  doctorId: string | IUser;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  slots: ITimeSlot[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}