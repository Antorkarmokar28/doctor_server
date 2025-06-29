import { IUser } from '../auth/auth.interface';
import { ITimeSlot } from '../availability/availability.interface';

export interface IAppointment {
  _id: string;
  doctorId: string | IUser;
  patientId: string | IUser;
  service: string;
  date: Date;
  timeSlot: ITimeSlot;
  status: 'pending' | 'accepted' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
