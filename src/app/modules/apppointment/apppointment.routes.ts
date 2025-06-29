import { Router } from 'express';
import auth from '../../middlewares/auth';
import { User_Role } from '../auth/auth.constant';
import validationRequest from '../../middlewares/validationRequest';
import { AppointmentZodValidationSchema } from './apppointment.validation';
import { AppoinmentController } from './apppointment.controller';

const router = Router();

router.post(
  '/appointments',
  auth(User_Role.patient),
  validationRequest(AppointmentZodValidationSchema.createAppointmentZodSchema),
  AppoinmentController.bookAppointment
);

export const appointmentRouter = router;
