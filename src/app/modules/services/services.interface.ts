import mongoose from "mongoose";

// doctorService.interface.ts
export interface IDoctorService {
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  doctorId: mongoose.Schema.Types.ObjectId;
}

// availability.interface.ts
export interface IDaySlot {
  day: string; // e.g. 'Monday'
  slots: { start: string; end: string }[];
}

export interface IAvailability {
  doctorId: mongoose.Schema.Types.ObjectId;
  serviceId: mongoose.Schema.Types.ObjectId;
  schedule: IDaySlot[];
}