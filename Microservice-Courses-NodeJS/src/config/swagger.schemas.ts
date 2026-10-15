/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Mensaje descriptivo del error
 *     Course:
 *       type: object
 *       description: Representa un curso
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Arquitectura de Software
 *         teacher:
 *           type: string
 *           example: Jesus David Mejia
 *         credits:
 *           type: number
 *           example: 3
 *         modality:
 *           type: string
 *           enum: [Presencial, Virtual, Hibrido]
 *           example: Virtual
 */
export {};
