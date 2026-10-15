# Parcial II - Microfrontends & Clean Architecture

**Arquitectura de Software · Unidad Central del Valle del Cauca (UCEVA)**
Docente: Jesus David Mejia Vergara

Solución distribuida con **Angular + Module Federation** (host + 3 microfrontends) integrada con **3 microservicios** (2 en Node.js y 1 en Spring Boot). Cada microfrontend y cada microservicio aplica **Clean Architecture** y expone **3 casos de uso** (9 en frontend y 9 en backend).

> **Integrantes:** _(completar con los 3 integrantes del grupo)_

## Estructura del monorepo

```
├── Client-Host-Angular/                 Host (navbar + Module Federation)
├── Microfrontend-Users-Angular/         MF 1 → consume Microservice-Users-NodeJS
├── Microfrontend-Products-Angular/      MF 2 → consume Microservice-Products-SpringBoot
├── Microfrontend-Courses-Angular/       MF 3 → consume Microservice-Courses-NodeJS
├── Microservice-Users-NodeJS/           Microservicio 1 (Node.js + Express)
├── Microservice-Products-SpringBoot/    Microservicio 2 (Spring Boot)
└── Microservice-Courses-NodeJS/         Microservicio 3 (Node.js + Express)
```

## Puertos y relación microfrontend ↔ microservicio

| Aplicación | Tecnología | Puerto | Consume |
|---|---|---|---|
| Client-Host-Angular | Angular + Module Federation | **4200** | Carga los 3 microfrontends |
| Microfrontend-Users-Angular | Angular | **4201** | Microservice-Users-NodeJS (**3001**) |
| Microfrontend-Products-Angular | Angular | **4202** | Microservice-Products-SpringBoot (**3002**) |
| Microfrontend-Courses-Angular | Angular | **4203** | Microservice-Courses-NodeJS (**3003**) |
| Microservice-Users-NodeJS | Node.js + Express | **3001** | — |
| Microservice-Products-SpringBoot | Spring Boot | **3002** (prefijo `/api`) | — |
| Microservice-Courses-NodeJS | Node.js + Express | **3003** | — |

Rutas del host: `/users` → `mf-users`, `/products` → `mf-products`, `/courses` → `mf-courses`.
Las conexiones se pueden verificar en la pestaña **Network** del navegador: cada microfrontend llama únicamente a su microservicio (`localhost:3001`, `3002` o `3003`).

## Requisitos

- Node.js 20+ y npm
- JDK 25 (toolchain definido en `Microservice-Products-SpringBoot/build.gradle`, igual que el proyecto guía)

## Ejecución (desde la consola)

Cada aplicación se ejecuta en su propia terminal.

**Microservicios Node.js** (`Microservice-Users-NodeJS` y `Microservice-Courses-NodeJS`):
```bash
npm install
npm start
```

**Microservicio Spring Boot** (`Microservice-Products-SpringBoot`):
```bash
./gradlew bootRun        # Windows: gradlew.bat bootRun
```

**Microfrontends y host** (`Microfrontend-*-Angular`, `Client-Host-Angular`):
```bash
npm install
npm start
```
Levantar primero los microservicios, luego los tres microfrontends y por último el host. Abrir <http://localhost:4200>.

## Casos de uso

| Microfrontend | Caso de uso 1 | Caso de uso 2 | Caso de uso 3 |
|---|---|---|---|
| Users | `GetAllUsersUseCase` | `GetUserByIdUseCase` | `GetUsersByEngineeringUseCase` |
| Products | `GetAllProductsUseCase` | `GetProductByIdUseCase` | `GetProductsByCategoryUseCase` |
| Courses | `GetAllCoursesUseCase` | `GetCourseByIdUseCase` | `GetCoursesByModalityUseCase` |

Los microservicios implementan los mismos tres casos de uso (en el mismo orden) y los exponen así:

| Servicio | `GET` listar | `GET` por id | `GET` por filtro |
|---|---|---|---|
| Users (3001) | `/api/users/{count}` | `/api/users/id/{id}` | `/api/users/engineering/{engineering}` |
| Products (3002) | `/api/products/{count}` | `/api/products/id/{id}` | `/api/products/category/{category}` |
| Courses (3003) | `/api/courses/{count}` | `/api/courses/id/{id}` | `/api/courses/modality/{modality}` |

Errores: `400` (parámetro inválido) y `404` (id inexistente) con cuerpo `{ "error": "mensaje" }`. Los datos se generan con **Faker** al iniciar el servicio (100 registros).

## Clean Architecture

**Microfrontends** (`src/app`):
```
core/
  domain/          models/ y repositories/ (contratos abstractos)
  application/     usecases/ (3 casos de uso)
  infrastructure/  services/data.service.ts (API Gateway HTTP) y repositories/ (implementación del contrato)
presentation/      pages/, components/, interfaces/
```
Los casos de uso dependen del contrato del repositorio; la implementación concreta se registra en los `providers` de la página (así funciona igual cuando la carga el host).

**Microservicios Node.js** (`src`): `domain/` (entities, repositories, errors) · `application/usecases/` · `infrastructure/` (datasource, repositories) · `presentation/` (controllers, routes, server). Las dependencias se ensamblan en `presentation/routes/*.routes.ts`.

**Microservicio Spring Boot** (`uceva.products`): `domain/` (entity, repository, exception) · `application/usecase/` · `infrastructure/` (datasource, repository, controller) · `config/` (AppConfig ensambla las dependencias).

## Pruebas unitarias (cobertura > 90 %)

En cada proyecto Angular (host y microfrontends):
```bash
npm test                 # Jest con cobertura; falla si baja del 90 % (umbral configurado en jest.config.js)
```
Cobertura obtenida: **100 %** en statements, branches, functions y lines en los cuatro proyectos.

Spring Boot incluye pruebas de los casos de uso: `./gradlew test`.

## Documentación técnica

- **Microfrontends y host (Compodoc):** `npm run compodoc` → se genera en `documentation/` (abrir `documentation/index.html`).
- **Microservicios Node.js (Swagger):** <http://localhost:3001/api/docs> y <http://localhost:3003/api/docs>
- **Microservicio Spring Boot (Swagger):** <http://localhost:3002/api/swagger-ui/index.html>
- Todo el código está documentado con TSDoc/Javadoc, indicando la capa de Clean Architecture a la que pertenece cada clase.

## Estándar de commits

`feat`, `fix`, `refactor`, `docs`, `test`, `chore` (por ejemplo: `feat(users): agrega caso de uso GetUserByIdUseCase`).
