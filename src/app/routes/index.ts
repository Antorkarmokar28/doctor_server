import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { doctorServiceRouter } from '../modules/services/services.route';
import { availabilityRouter } from '../modules/availability/availability.routes';

const router = Router();

const moduleRouter = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/doctor',
    route: doctorServiceRouter,
  },
  {
    path: '/doctor',
    route: availabilityRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
