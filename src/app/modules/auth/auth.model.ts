/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
// user registration schema defination
const userRegistrationSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ['doctor', 'patient', 'admin'],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true, select: 0 },
    specialization: String, // for doctor
    hospitalName: String, // for doctor
    hospitalFloor: String, // for doctor
    age: Number, // for patient
    gender: { type: String, enum: ['male', 'female', 'other'] },
  },
  { timestamps: true }
);
// this function using for user password hash
userRegistrationSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userRegistrationSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
// user find by email with static method
userRegistrationSchema.statics.isUserIsExitsByEmail = async function (
  email: string
) {
  return await User.findOne({ email }).select('+password');
};
// user password match checkin with static method
userRegistrationSchema.statics.isPasswordMatched = async function (
  planeTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};
export const User = model<IUser, UserModel>('User', userRegistrationSchema);
