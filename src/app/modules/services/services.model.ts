import { model, Schema } from 'mongoose';
import { IDoctorService } from './services.interface';

const doctorServiceSchema = new Schema<IDoctorService>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    doctorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export const DoctorService = model<IDoctorService>('Doctor Service', doctorServiceSchema);
