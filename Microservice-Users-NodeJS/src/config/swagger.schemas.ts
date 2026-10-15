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
 *     User:
 *       type: object
 *       description: Representa un usuario
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Carlos
 *         lastName:
 *           type: string
 *           example: Ramírez
 *         age:
 *           type: number
 *           example: 22
 *         email:
 *           type: string
 *           example: carlos.ramirez@example.com
 *         engineering:
 *           type: string
 *           enum: [Sistemas, Electronica, Biomedica, Industrial, Ambiental]
 *           example: Sistemas
 */
export {};
