import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Customers Microservice API',
    version: '1.0.0',
    description: 'Documentación OpenAPI / Swagger del Microservicio de Clientes (Clean Architecture)',
    contact: {
      name: 'Equipo de Arquitectura de Software'
    }
  },
  servers: [
    {
      url: 'http://localhost:3002',
      description: 'Servidor Local de Clientes'
    }
  ],
  components: {
    schemas: {
      Customer: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'CUST-101' },
          name: { type: 'string', example: 'Elena Rostova' },
          email: { type: 'string', example: 'elena@empresa.com' },
          phone: { type: 'string', example: '+1-555-0199' },
          company: { type: 'string', example: 'TechCorp Global' },
          status: { type: 'string', example: 'ACTIVE' },
          registeredAt: { type: 'string', format: 'date-time' }
        }
      },
      RegisterCustomerDto: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', example: 'Elena Rostova' },
          email: { type: 'string', example: 'elena@empresa.com' },
          phone: { type: 'string', example: '+1-555-0199' },
          company: { type: 'string', example: 'TechCorp Global' }
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
