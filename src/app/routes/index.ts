import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { doctorServiceRouter } from '../modules/services/services.route';

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
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
