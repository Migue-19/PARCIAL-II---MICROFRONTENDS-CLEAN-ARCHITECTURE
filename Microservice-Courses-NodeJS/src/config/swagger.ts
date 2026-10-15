import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Especificación OpenAPI (Swagger) del microservicio de cursos.
 *
 * @remarks
 * Se genera con `swagger-jsdoc` a partir de los comentarios `@openapi`
 * de las rutas y de `swagger.schemas.ts`. Se publica en `/api/docs`.
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Microservicio de Courses (Node.js)',
      version: '1.0.0',
      description: 'Microservicio de cursos con Clean Architecture - 3 casos de uso',
    },
    servers: [{ url: 'http://localhost:3003' }],
  },
  apis: [
    './src/presentation/routes/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
  ],
});
