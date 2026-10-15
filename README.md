# PARCIAL II: Microfrontends & Microservicios con Clean Architecture

> **Entrega Final — Paso 3: Integración Total, Pruebas Globales y Documentación de Cierre**

Solución distribuida basada en **Microfrontends (Angular 17 + Webpack Module Federation)** integrados con **Microservicios (Node.js/Express y Spring Boot)**, aplicando rigurosamente **Clean Architecture** y documentación interactiva mediante **Swagger / OpenAPI**.

---

## 1. Arquitectura General del Monorepositorio

```
PARCIAL-II---MICROFRONTENDS-CLEAN-ARCHITECTURE/
├── frontend/
│   ├── host/                     # Shell Container Angular — Puerto 4200
│   ├── mfe-products/             # MFE 1: Catálogo de Productos — Puerto 4201
│   ├── mfe-orders/               # MFE 2: Gestión de Órdenes — Puerto 4202
│   └── mfe-customers/            # MFE 3: Directorio de Clientes — Puerto 4203
│
├── backend/
│   ├── products-service/         # Microservicio 1 — Node.js/TS — Puerto 3001
│   ├── orders-service/           # Microservicio 2 — Spring Boot — Puerto 8080
│   └── customers-service/        # Microservicio 3 — Node.js/TS — Puerto 3002
│
├── package.json                  # Scripts unificados + npm workspaces
└── README.md                     # Documentación completa del sistema
```

---

## 2. Matriz de Puertos e Integración Frontend → Backend

| Componente | Tipo | Tecnología | Puerto / URL | Swagger / API Docs | Dependencia |
|:---|:---|:---|:---|:---|:---|
| **host** | Host Shell MFE | Angular 17 + Module Federation | `http://localhost:4200` | N/A | Orquesta los 3 MFEs |
| **mfe-products** | Microfrontend 1 | Angular 17 + Clean Arch | `http://localhost:4201` | N/A | Consume `products-service` |
| **mfe-orders** | Microfrontend 2 | Angular 17 + Clean Arch | `http://localhost:4202` | N/A | Consume `orders-service` |
| **mfe-customers** | Microfrontend 3 | Angular 17 + Clean Arch | `http://localhost:4203` | N/A | Consume `customers-service` |
| **products-service** | Microservicio 1 | Node.js + Express + TS | `http://localhost:3001` | [`http://localhost:3001/api-docs`](http://localhost:3001/api-docs) | Consumido por mfe-products |
| **orders-service** | Microservicio 2 | Java 21 / Spring Boot 3 | `http://localhost:8080` | [`http://localhost:8080/swagger-ui.html`](http://localhost:8080/swagger-ui.html) | Consumido por mfe-orders |
| **customers-service** | Microservicio 3 | Node.js + Express + TS | `http://localhost:3002` | [`http://localhost:3002/api-docs`](http://localhost:3002/api-docs) | Consumido por mfe-customers |

---

## 3. Diagrama de Arquitectura — Module Federation + Clean Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER (Puerto 4200)                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              HOST SHELL (Angular + MF)                     │  │
│  │  NavbarComponent ── RouterModule ── <router-outlet>        │  │
│  │       ↓ lazy import()                                      │  │
│  │  /products ──────→ mfeProducts@4201/remoteEntry.js         │  │
│  │  /orders   ──────→ mfeOrders@4202/remoteEntry.js           │  │
│  │  /customers ─────→ mfeCustomers@4203/remoteEntry.js        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────────┐
│ mfe-products │   │  mfe-orders  │   │  mfe-customers   │
│  :4201       │   │  :4202       │   │  :4203           │
│  Clean Arch  │   │  Clean Arch  │   │  Clean Arch      │
└──────┬───────┘   └──────┬───────┘   └────────┬─────────┘
       │ HTTP              │ HTTP               │ HTTP
       ▼                   ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────────┐
│products-svc  │   │ orders-svc   │   │ customers-svc    │
│ Node.js :3001│   │Spring Boot   │   │ Node.js :3002    │
│ Swagger:3001 │   │   :8080      │   │ Swagger:3002     │
│ /api-docs    │   │/swagger-ui   │   │ /api-docs        │
└──────────────┘   └──────────────┘   └──────────────────┘
```

### Clean Architecture — Capas por Servicio

```
┌──────────────────────────────────────────┐
│        PRESENTATION LAYER                 │  ← Controllers / Angular Components
│  (HTTP routes, Angular views, Templates)  │
├──────────────────────────────────────────┤
│        APPLICATION LAYER                  │  ← Use Cases / Services
│  (Business orchestration, DTOs)           │
├──────────────────────────────────────────┤
│         DOMAIN LAYER                      │  ← Entities, Repository Interfaces
│  (Pure business rules, no dependencies)   │
├──────────────────────────────────────────┤
│      INFRASTRUCTURE LAYER                 │  ← In-memory / DB adapters, HTTP clients
│  (Concrete implementations)               │
└──────────────────────────────────────────┘
         ← Dependency Rule: outer → inner →
```

---

## 4. Module Federation — Configuración del Host

**`frontend/host/webpack.config.js`** declara los 3 remotos:

```js
remotes: {
  mfeProducts:  'mfeProducts@http://localhost:4201/remoteEntry.js',
  mfeOrders:    'mfeOrders@http://localhost:4202/remoteEntry.js',
  mfeCustomers: 'mfeCustomers@http://localhost:4203/remoteEntry.js',
},
```

**`frontend/host/src/app/app.routes.ts`** — lazy loading de cada MFE:

```ts
{ path: 'products',  loadChildren: () => import('mfeProducts/Routes').then(m => m.PRODUCT_ROUTES)  },
{ path: 'orders',    loadChildren: () => import('mfeOrders/Routes').then(m => m.ORDER_ROUTES)      },
{ path: 'customers', loadChildren: () => import('mfeCustomers/Routes').then(m => m.CUSTOMER_ROUTES) },
```

---

## 5. Guía de Instalación y Ejecución

### Prerrequisitos

| Herramienta | Versión mínima | Verificar |
|:---|:---|:---|
| Node.js | 18 LTS | `node --version` |
| npm | 9+ | `npm --version` |
| Java JDK | 21 | `java --version` |
| Git | cualquiera | `git --version` |

### Paso 1 — Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd PARCIAL-II---MICROFRONTENDS-CLEAN-ARCHITECTURE
```

### Paso 2 — Instalar todas las dependencias Node.js

```bash
npm run install:all
```

> Esto instala dependencias del root (concurrently), todos los MFEs y los dos microservicios Node.js.

### Paso 3 — Iniciar todos los servicios simultáneamente

```bash
npm run start:all
```

O bien, iniciar cada componente en terminales separadas:

```bash
# Terminal 1 — Microservicio Products (Node.js :3001)
npm run start:backend:products

# Terminal 2 — Microservicio Orders (Spring Boot :8080)
npm run start:backend:orders

# Terminal 3 — Microservicio Customers (Node.js :3002)
npm run start:backend:customers

# Terminal 4 — MFE Products (:4201)
npm run start:frontend:products

# Terminal 5 — MFE Orders (:4202)
npm run start:frontend:orders

# Terminal 6 — MFE Customers (:4203)
npm run start:frontend:customers

# Terminal 7 — Host Shell (:4200)
npm run start:host
```

### Paso 4 — Abrir la aplicación

- **Portal principal:** [http://localhost:4200](http://localhost:4200)
- **Swagger Products:** [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- **Swagger Orders:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Swagger Customers:** [http://localhost:3002/api-docs](http://localhost:3002/api-docs)

---

## 6. Suite de Pruebas Unitarias

### Ejecutar TODAS las pruebas (con cobertura)

```bash
npm run test:all
```

Secuencia de ejecución:
1. `jest --coverage` → MFE Products
2. `jest --coverage` → MFE Orders
3. `jest --coverage` → MFE Customers
4. `jest --coverage` → MS Products (Node.js)
5. `jest --coverage` → MS Customers (Node.js)
6. `./mvnw.cmd test` → MS Orders (Spring Boot + JUnit 5)

### Pruebas por componente

```bash
# MFEs (Angular / Jest)
npm run test:mfe:products
npm run test:mfe:orders
npm run test:mfe:customers

# Microservicios Node.js (Jest)
npm run test:backend:products
npm run test:backend:customers

# Microservicio Spring Boot (Maven / JUnit 5)
npm run test:backend:orders
# o directamente:
cd backend/orders-service
./mvnw test          # Linux/macOS
.\mvnw.cmd test      # Windows
```

---

## 7. Maven Wrapper — orders-service

El proyecto incluye Maven Wrapper en `backend/orders-service/` para garantizar compilación y pruebas sin instalación global de Maven:

```
backend/orders-service/
├── mvnw                             # Script Unix/macOS
├── mvnw.cmd                         # Script Windows
└── .mvn/
    └── wrapper/
        └── maven-wrapper.properties # Maven 3.9.6
```

```bash
# Compilar y ejecutar pruebas (Windows)
cd backend/orders-service
.\mvnw.cmd test

# Iniciar el servicio (Windows)
.\mvnw.cmd spring-boot:run
```

---

## 8. Estructura Detallada de Clean Architecture (por componente)

### Microservicios Node.js (products-service / customers-service)

```
src/
├── domain/           # Entidades + interfaces de repositorio (sin dependencias externas)
├── application/      # Use cases / servicios de aplicación
├── infrastructure/   # Adaptadores concretos (in-memory repos, DB)
├── presentation/     # Express routes + controllers
└── server.ts         # Entry point + Swagger setup
```

### Microservicio Spring Boot (orders-service)

```
src/main/java/com/architecture/
├── domain/           # Entidades JPA-free + OrderRepositoryPort
├── application/      # Use cases (CreateOrderUseCase, etc.)
├── infrastructure/   # Adapters: in-memory / JPA repos
└── presentation/     # REST Controllers + Swagger @Operation
```

### Microfrontends Angular (mfe-products / mfe-orders / mfe-customers)

```
src/app/
├── domain/           # Modelos de negocio + Repository interfaces
├── application/      # Services (use cases del frontend)
├── infrastructure/   # HTTP adapters (calls a los microservicios)
└── presentation/     # Components, templates, routes
```

---

## 9. Scripts Raíz Completos

| Script | Descripción |
|:---|:---|
| `npm run install:all` | Instala dependencias de todos los sub-proyectos Node.js |
| `npm run start:all` | Inicia los 7 servicios concurrentemente con colores |
| `npm run start:host` | Host Shell Angular (`:4200`) |
| `npm run start:frontend:products` | MFE Products (`:4201`) |
| `npm run start:frontend:orders` | MFE Orders (`:4202`) |
| `npm run start:frontend:customers` | MFE Customers (`:4203`) |
| `npm run start:backend:products` | MS Products Node.js (`:3001`) |
| `npm run start:backend:orders` | MS Orders Spring Boot (`:8080`) via mvnw.cmd |
| `npm run start:backend:customers` | MS Customers Node.js (`:3002`) |
| `npm run test:all` | **Suite completa** — todos los Jest + Maven JUnit (con coverage) |
| `npm run test:mfe:products` | Jest — MFE Products (con coverage) |
| `npm run test:mfe:orders` | Jest — MFE Orders (con coverage) |
| `npm run test:mfe:customers` | Jest — MFE Customers (con coverage) |
| `npm run test:backend:products` | Jest — MS Products (con coverage) |
| `npm run test:backend:customers` | Jest — MS Customers (con coverage) |
| `npm run test:backend:orders` | Maven JUnit — MS Orders Spring Boot |

---

## 10. Tecnologías Utilizadas

| Área | Tecnología | Versión |
|:---|:---|:---|
| Frontend Framework | Angular | 17.x |
| Module Federation | Webpack | 5.x |
| Frontend Language | TypeScript | 5.3.x |
| Backend (JS) | Node.js + Express | 18 LTS / 4.x |
| Backend (Java) | Spring Boot | 3.3.x |
| Java Version | OpenJDK | 21 |
| Build Tool (Java) | Maven Wrapper | 3.9.6 |
| API Docs (JS) | Swagger UI Express | 5.x |
| API Docs (Java) | SpringDoc OpenAPI | 2.6.x |
| Testing (JS) | Jest + ts-jest | 29.x |
| Testing (Java) | JUnit 5 + Spring Test | 3.3.x |
| Process Manager | concurrently | 8.x |

---

*Parcial II — Microfrontends & Clean Architecture — Entrega Final*
