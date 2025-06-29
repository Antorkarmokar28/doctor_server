import { Router } from 'express';
import auth from '../../middlewares/auth';
import { User_Role } from '../auth/auth.constant';
import { AvailabilityController } from './availability.controller';
import validationRequest from '../../middlewares/validationRequest';
import { availabilityZodValidationSchema } from './availability.validation';

const router = Router();
router.post(
  '/availability',
  auth(User_Role.doctor),
  validationRequest(
    availabilityZodValidationSchema.createAvailabilityZodSchema
  ),
  AvailabilityController.createAvailability
);

router.get(
  '/availability/:doctorId',
  auth(User_Role.doctor),
  AvailabilityController.getDoctorAvailability
);

router.patch(
  '/availability/:id',
  validationRequest(
    availabilityZodValidationSchema.updateAvailabilityZodSchema
  ),
  AvailabilityController.updateDoctorAvailability
);


export const availabilityRouter = router;
