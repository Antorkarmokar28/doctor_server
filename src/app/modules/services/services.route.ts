import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { DoctorServiceZodValidationSchema } from './services.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../auth/auth.constant';
import { DoctorServiceController } from './services.controller';

const router = Router();

router.post(
  '/services',
  auth(User_Role.doctor),
  validationRequest(
    DoctorServiceZodValidationSchema.createDoctorServiceZodSchema
  ),
  DoctorServiceController.addDoctorService
);

router.patch(
  '/services/:id',
  auth(User_Role.doctor),
  validationRequest(
    DoctorServiceZodValidationSchema.updateDoctorServiceZodSchema
  ),
  DoctorServiceController.updateDoctorService
);

router.delete(
  '/services/:id',
  auth(User_Role.doctor),
  DoctorServiceController.deleteDoctorService
);

export const doctorServiceRouter = router;
