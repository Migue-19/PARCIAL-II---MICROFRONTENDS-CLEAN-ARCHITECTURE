import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger';
import { createProductRouter } from './presentation/routes/product.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Documentación Swagger / OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/products', createProductRouter());

// Endpoint de salud
app.get('/health', (_req, res) => {
  res.json({
    service: 'products-service',
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

export const server = app.listen(PORT, () => {
  console.log(`[Products-Service] Microservicio corriendo en http://localhost:${PORT}`);
  console.log(`[Products-Service] Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

export default app;
