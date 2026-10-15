# PARCIAL II: Microfrontends & Microservicios con Clean Architecture

Este proyecto es una solución distribuida basada en **Microfrontends (Angular + Webpack Module Federation)** integrados con **Microservicios (Node.js & Spring Boot)**, aplicando rigurosamente **Clean Architecture** (separación estricta por capas: Domain, Application, Infrastructure, Presentation) y documentación interactiva mediante **Swagger / OpenAPI**.

---

## 🏛️ 1. Arquitectura General del Monorepositorio

El repositorio está organizado en dos directorios principales: `frontend/` y `backend/`.

```
PARCIAL-II---MICROFRONTENDS-CLEAN-ARCHITECTURE/
├── frontend/
│   ├── host/                     # Shell Container Angular (Puerto 4200)
│   ├── mfe-products/             # MFE 1: Catálogo de Productos (Puerto 4201)
│   ├── mfe-orders/               # MFE 2: Gestión de Órdenes (Puerto 4202)
│   └── mfe-customers/            # MFE 3: Directorio de Clientes (Puerto 4203)
│
├── backend/
│   ├── products-service/         # Microservicio 1 (Node.js/TS - Puerto 3001)
│   ├── orders-service/           # Microservicio 2 (Spring Boot - Puerto 8080)
│   └── customers-service/        # Microservicio 3 (Node.js/TS - Puerto 3002)
│
├── package.json                  # Scripts unificados de ejecución y workspaces
└── README.md                     # Documentación completa del sistema
```

---

## 🔌 2. Matriz de Puertos e Integración Frontend ➔ Backend

| Aplicación / Servicio | Tipo | Tecnología | Puerto Local | Documentación Swagger | Microservicio Asociado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **host** | Host Shell MFE | Angular 17 + Module Federation | `http://localhost:4200` | N/A | Orquestador de MFEs |
| **mfe-products** | Microfrontend 1 | Angular 17 + Clean Arch | `http://localhost:4201` | N/A | Consume `products-service` (:3001) |
| **mfe-orders** | Microfrontend 2 | Angular 17 + Clean Arch | `http://localhost:4202` | N/A | Consume `orders-service` (:8080) |
| **mfe-customers** | Microfrontend 3 | Angular 17 + Clean Arch | `http://localhost:4203` | N/A | Consume `customers-service` (:3002) |
| **products-service** | Microservicio 1 | Node.js + Express + TS | `http://localhost:3001` | `http://localhost:3001/api-docs` | Consumido por `mfe-products` |
| **orders-service** | Microservicio 2 | Java 23 / Spring Boot 3 | `http://localhost:8080` | `http://localhost:8080/swagger-ui.html` | Consumido por `mfe-orders` |
| **customers-service**| Microservicio 3 | Node.js + Express + TS | `http://localhost:3002` | `http://localhost:3002/api-docs` | Consumido por `mfe-customers` |

---

## 🧼 3. Clean Architecture (Estructura de Capas)

Tanto los Microfrontends como los Microservicios respetan la regla de dependencia hacia el interior:

1. **Domain Layer**:
   - Entidades del negocio puras y objetos de valor (sin dependencias externas ni de frameworks).
   - Puertos / Interfaces de Repositorios (`IProductRepository`, `OrderRepositoryPort`, etc.).
2. **Application Layer**:
   - Casos de Uso específicos e independientes (3 por cada MFE y 3 por cada Microservicio).
   - DTOs de entrada y salida y validaciones de reglas de negocio.
3. **Infrastructure Layer**:
   - Adaptadores de persistencia (InMemory / Base de datos) y Gateways de consumo HTTP (`ProductsApiGateway`, `OrdersApiGateway`).
   - Configuración técnica y documentación Swagger OpenAPI.
4. **Presentation Layer**:
   - En Backend: Controladores REST y definición de Rutas Express / Spring MVC.
   - En Frontend: Componentes de UI Angular desacoplados, Formularios reactivos y Páginas contenedoras.

---

## 📋 4. Relación de Casos de Uso Implementados (18 Casos de Uso en Total)

### A. MFE 1 (`mfe-products`) & Microservicio 1 (`products-service`)
- **Caso de Uso 1**: Listar catálogo de productos (`GetProductsUseCase` / `GetAllProductsUseCase`).
- **Caso de Uso 2**: Obtener detalle de producto por ID (`GetProductByIdUseCase`).
- **Caso de Uso 3**: Registrar nuevo producto (`CreateProductUseCase`).

### B. MFE 2 (`mfe-orders`) & Microservicio 2 (`orders-service`)
- **Caso de Uso 1**: Listar órdenes de compra registradas (`ListOrdersUseCase`).
- **Caso de Uso 2**: Consultar orden por identificador (`GetOrderByIdUseCase`).
- **Caso de Uso 3**: Crear nueva orden con items calculados (`CreateOrderUseCase`).

### C. MFE 3 (`mfe-customers`) & Microservicio 3 (`customers-service`)
- **Caso de Uso 1**: Listar directorio de clientes (`GetCustomersUseCase` / `GetAllCustomersUseCase`).
- **Caso de Uso 2**: Consultar perfil de cliente por ID (`GetCustomerByIdUseCase`).
- **Caso de Uso 3**: Registrar nuevo cliente en la plataforma (`RegisterCustomerUseCase`).

---

## 🚀 5. Instrucciones de Ejecución

### Prerrequisitos
- **Node.js**: v18+ (probado con v24)
- **Java**: JDK 21+ (probado con Java 23)

### Paso 1: Instalación de Dependencias

Ejecuta desde la raíz del proyecto:
```bash
# Instalar dependencias del backend de productos
cd backend/products-service
npm install
cd ../..

# Instalar dependencias del backend de clientes
cd backend/customers-service
npm install
cd ../..
```

### Paso 2: Ejecución de los Microservicios (Backend)

Abre terminales independientes para cada microservicio:

- **Microservicio 1 (Productos - Node.js)**:
  ```bash
  cd backend/products-service
  npm run dev
  # Disponible en: http://localhost:3001
  # Swagger en: http://localhost:3001/api-docs
  ```

- **Microservicio 2 (Órdenes - Spring Boot)**:
  ```bash
  cd backend/orders-service
  mvn spring-boot:run
  # Disponible en: http://localhost:8080
  # Swagger en: http://localhost:8080/swagger-ui.html
  ```

- **Microservicio 3 (Clientes - Node.js)**:
  ```bash
  cd backend/customers-service
  npm run dev
  # Disponible en: http://localhost:3002
  # Swagger en: http://localhost:3002/api-docs
  ```

### Paso 3: Ejecución del Frontend (Host y Microfrontends)

- **Host Shell (Angular)**:
  ```bash
  cd frontend/host
  npm install
  npm start
  # Disponible en: http://localhost:4200
  ```

- **Microfrontend 1 (Productos)**:
  ```bash
  cd frontend/mfe-products
  npm install
  npm start
  # Disponible en: http://localhost:4201
  ```

- **Microfrontend 2 (Órdenes)**:
  ```bash
  cd frontend/mfe-orders
  npm install
  npm start
  # Disponible en: http://localhost:4202
  ```

- **Microfrontend 3 (Clientes)**:
  ```bash
  cd frontend/mfe-customers
  npm install
  npm start
  # Disponible en: http://localhost:4203
  ```

---

## 🧪 6. Pruebas Unitarias y Cobertura (>90%)

Para ejecutar las suites de pruebas unitarias configuradas para superar el 90% de cobertura:

- **Backend Products-Service**:
  ```bash
  cd backend/products-service
  npm test
  ```
  *(Resultado verificado: 100% de cobertura en líneas, funciones y ramas de los casos de uso).*

- **Microfrontends**:
  ```bash
  cd frontend/mfe-products
  npm test
  ```
