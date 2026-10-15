import { Request, Response } from 'express';
import { GetAllCoursesUseCase } from '../../application/usecases/get-all-courses.usecase';
import { GetCourseByIdUseCase } from '../../application/usecases/get-course-by-id.usecase';
import { GetCoursesByModalityUseCase } from '../../application/usecases/get-courses-by-modality.usecase';
import { HandleError } from '../../domain/errors/handle.error';

/** Latencia simulada (ms) para poder observar el estado de carga en el frontend. */
const SIMULATED_LATENCY_MS = 1000;

/**
 * Controlador HTTP de cursos.
 *
 * @remarks
 * Pertenece a la **capa de presentación**: traduce las peticiones HTTP a
 * llamadas a los casos de uso y los resultados/errores a respuestas HTTP.
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
export class CoursesController {
  constructor(
    private readonly getAllCoursesUseCase: GetAllCoursesUseCase,
    private readonly getCourseByIdUseCase: GetCourseByIdUseCase,
    private readonly getCoursesByModalityUseCase: GetCoursesByModalityUseCase,
  ) {}

  /** GET /api/courses/:countCourses */
  getAllCourses = (req: Request, res: Response): void => {
    const { countCourses } = req.params;
    setTimeout(() => {
      this.getAllCoursesUseCase
        .execute(Number(countCourses))
        .then((courses) => res.status(200).json(courses))
        .catch((error) => HandleError.error(error, res));
    }, SIMULATED_LATENCY_MS);
  };

  /** GET /api/courses/id/:id */
  getCourseById = (req: Request, res: Response): void => {
    const { id } = req.params;
    setTimeout(() => {
      this.getCourseByIdUseCase
        .execute(Number(id))
        .then((course) => res.status(200).json(course))
        .catch((error) => HandleError.error(error, res));
    }, SIMULATED_LATENCY_MS);
  };

  /** GET /api/courses/modality/:modality */
  getCoursesByModality = (req: Request, res: Response): void => {
    const { modality } = req.params;
    setTimeout(() => {
      this.getCoursesByModalityUseCase
        .execute(String(modality))
        .then((courses) => res.status(200).json(courses))
        .catch((error) => HandleError.error(error, res));
    }, SIMULATED_LATENCY_MS);
  };
}
