import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger';
import { createCustomerRouter } from './presentation/routes/customer.routes';

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Documentación Swagger / OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/customers', createCustomerRouter());

// Endpoint de salud
app.get('/health', (_req, res) => {
  res.json({
    service: 'customers-service',
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

export const server = app.listen(PORT, () => {
  console.log(`[Customers-Service] Microservicio corriendo en http://localhost:${PORT}`);
  console.log(`[Customers-Service] Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

export default app;
