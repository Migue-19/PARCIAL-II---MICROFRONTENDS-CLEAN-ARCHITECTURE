import { Router } from 'express';
import { GetAllCoursesUseCase } from '../../application/usecases/get-all-courses.usecase';
import { GetCourseByIdUseCase } from '../../application/usecases/get-course-by-id.usecase';
import { GetCoursesByModalityUseCase } from '../../application/usecases/get-courses-by-modality.usecase';
import { CourseDatasource } from '../../infrastructure/datasource/course.datasource';
import { CourseRepositoryImpl } from '../../infrastructure/repositories/course.repository.impl';
import { CoursesController } from '../controllers/courses.controller';

/**
 * Rutas de cursos y raíz de composición (inyección de dependencias).
 *
 * @remarks
 * Aquí se ensamblan las capas: datasource → repositorio → casos de uso →
 * controlador.
 */
export class CoursesRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CourseDatasource();
    const repository = new CourseRepositoryImpl(datasource);
    const controller = new CoursesController(
      new GetAllCoursesUseCase(repository),
      new GetCourseByIdUseCase(repository),
      new GetCoursesByModalityUseCase(repository),
    );

    /**
     * @openapi
     * /api/courses/{countCourses}:
     *   get:
     *     summary: Caso de uso 1 - Listar cursos
     *     description: Retorna los primeros N cursos del conjunto de datos.
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: countCourses
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de cursos a solicitar
     *     responses:
     *       200:
     *         description: Lista de cursos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
     *       400:
     *         description: Cantidad inválida
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/:countCourses', controller.getAllCourses);

    /**
     * @openapi
     * /api/courses/id/{id}:
     *   get:
     *     summary: Caso de uso 2 - Obtener un curso por id
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador del curso
     *     responses:
     *       200:
     *         description: Course encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Course'
     *       400:
     *         description: Id inválido
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: No existe un curso con ese id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/id/:id', controller.getCourseById);

    /**
     * @openapi
     * /api/courses/modality/{modality}:
     *   get:
     *     summary: Caso de uso 3 - Listar cursos por modalidad
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: modality
     *         required: true
     *         schema:
     *           type: string
     *           enum: [Presencial, Virtual, Hibrido]
     *           example: Virtual
     *         description: modalidad a filtrar
     *     responses:
     *       200:
     *         description: Lista de cursos de esa modalidad
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
     *       400:
     *         description: modalidad inválida
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/modality/:modality', controller.getCoursesByModality);

    return router;
  }
}
