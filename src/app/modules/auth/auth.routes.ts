import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AtuhValidationSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/register-doctor',
  validationRequest(AtuhValidationSchema.doctorRegistrationSchema),
  AuthController.registrationDoctor
);

router.post(
  '/register-patient',
  validationRequest(AtuhValidationSchema.patientRegistrationSchema),
  AuthController.registrationPatient
);

router.post('/login', AuthController.userLogin);

export const authRouter = router;
