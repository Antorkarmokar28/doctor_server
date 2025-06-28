import { Router } from 'express';
import { authRouter } from '../modules/user/user.routes';

const router = Router();

const moduleRouter = [
  {
    path: '/auth',
    route: authRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
