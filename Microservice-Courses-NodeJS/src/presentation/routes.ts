import { Router } from 'express';
import { CoursesRoutes } from './routes/courses.routes';

/**
 * Agrupa las rutas de la aplicación.
 */
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/courses', CoursesRoutes.routes);
    return router;
  }
}
