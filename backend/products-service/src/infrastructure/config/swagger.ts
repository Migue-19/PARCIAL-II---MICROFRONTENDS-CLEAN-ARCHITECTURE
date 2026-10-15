import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Products Microservice API',
    version: '1.0.0',
    description: 'Documentación OpenAPI / Swagger del Microservicio de Productos (Clean Architecture)',
    contact: {
      name: 'Equipo de Arquitectura de Software'
    }
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor Local de Desarrollo'
    }
  ],
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'prod-001' },
          name: { type: 'string', example: 'Laptop Developer Pro' },
          description: { type: 'string', example: 'Portátil 32GB RAM' },
          price: { type: 'number', example: 1899.99 },
          stock: { type: 'number', example: 15 },
          category: { type: 'string', example: 'Laptops' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateProductDto: {
        type: 'object',
        required: ['name', 'price', 'stock'],
        properties: {
          name: { type: 'string', example: 'Mouse Ergonómico' },
          description: { type: 'string', example: 'Mouse inalámbrico recargable' },
          price: { type: 'number', example: 49.99 },
          stock: { type: 'number', example: 50 },
          category: { type: 'string', example: 'Periféricos' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/presentation/routes/*.ts', './dist/presentation/routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
