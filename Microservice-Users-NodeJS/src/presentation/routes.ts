import { Router } from 'express';
import { UsersRoutes } from './routes/users.routes';

/**
 * Agrupa las rutas de la aplicación.
 */
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/users', UsersRoutes.routes);
    return router;
  }
}
