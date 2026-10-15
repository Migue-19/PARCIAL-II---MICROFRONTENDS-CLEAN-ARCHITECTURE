import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <section class="hero-card">
        <div class="hero-badge">Arquitectura de Software Distribuida</div>
        <h1 class="hero-title">Sistema de Microfrontends & Microservicios</h1>
        <p class="hero-desc">
          Plataforma modular construida con <strong>Angular + Webpack Module Federation</strong> en el frontend y 
          <strong>Microservicios (Node.js & Spring Boot)</strong> en el backend, aplicando rigurosamente 
          <strong>Clean Architecture</strong> (Dominio, Aplicación, Infraestructura, Presentación) y documentación Swagger OpenAPI.
        </p>
      </section>

      <section class="grid-section">
        <h2 class="section-title">Ecosistema de Microfrontends (Module Federation)</h2>
        <div class="cards-grid">
          
          <!-- MFE 1 Card -->
          <div class="mfe-card">
            <div class="card-header">
              <span class="card-icon">📦</span>
              <div>
                <span class="mfe-badge">Puerto :4201</span>
                <h3>MFE Productos</h3>
              </div>
            </div>
            <p class="card-text">
              Gestión de inventario y catálogo. Implementa 3 casos de uso en Clean Architecture consumiendo su microservicio.
            </p>
            <div class="clean-arch-tags">
              <span>Domain</span>
              <span>Application</span>
              <span>Infrastructure</span>
              <span>Presentation</span>
            </div>
            <div class="card-footer">
              <span class="backend-tag">Node.js API (:3001)</span>
              <a routerLink="/products" class="btn-primary">Ver MFE ➔</a>
            </div>
          </div>

          <!-- MFE 2 Card -->
          <div class="mfe-card">
            <div class="card-header">
              <span class="card-icon">🛒</span>
              <div>
                <span class="mfe-badge">Puerto :4202</span>
                <h3>MFE Órdenes</h3>
              </div>
            </div>
            <p class="card-text">
              Gestión y tracking de pedidos de clientes con persistencia y lógica de procesamiento de compras.
            </p>
            <div class="clean-arch-tags">
              <span>Domain</span>
              <span>Application</span>
              <span>Infrastructure</span>
              <span>Presentation</span>
            </div>
            <div class="card-footer">
              <span class="backend-tag">Spring Boot API (:8080)</span>
              <a routerLink="/orders" class="btn-primary">Ver MFE ➔</a>
            </div>
          </div>

          <!-- MFE 3 Card -->
          <div class="mfe-card">
            <div class="card-header">
              <span class="card-icon">👥</span>
              <div>
                <span class="mfe-badge">Puerto :4203</span>
                <h3>MFE Clientes</h3>
              </div>
            </div>
            <p class="card-text">
              Administración de usuarios y perfiles de clientes registrados en la plataforma.
            </p>
            <div class="clean-arch-tags">
              <span>Domain</span>
              <span>Application</span>
              <span>Infrastructure</span>
              <span>Presentation</span>
            </div>
            <div class="card-footer">
              <span class="backend-tag">Node.js API (:3002)</span>
              <a routerLink="/customers" class="btn-primary">Ver MFE ➔</a>
            </div>
          </div>

        </div>
      </section>

      <section class="mapping-table-section">
        <h2 class="section-title">Matriz de Integración MFE ➔ Microservicio</h2>
        <div class="table-responsive">
          <table class="arch-table">
            <thead>
              <tr>
                <th>Capa Frontend (MFE)</th>
                <th>Puerto Frontend</th>
                <th>Capa Backend (Microservicio)</th>
                <th>Tecnología Backend</th>
                <th>Puerto Backend</th>
                <th>Swagger UI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>MFE Productos</strong> (mfe-products)</td>
                <td><span class="port-chip">:4201</span></td>
                <td><strong>products-service</strong></td>
                <td>Node.js / Express + TS</td>
                <td><span class="port-chip">:3001</span></td>
                <td><a href="http://localhost:3001/api-docs" target="_blank" class="link-swagger">/api-docs ↗</a></td>
              </tr>
              <tr>
                <td><strong>MFE Órdenes</strong> (mfe-orders)</td>
                <td><span class="port-chip">:4202</span></td>
                <td><strong>orders-service</strong></td>
                <td>Java 23 / Spring Boot</td>
                <td><span class="port-chip">:8080</span></td>
                <td><a href="http://localhost:8080/swagger-ui.html" target="_blank" class="link-swagger">/swagger-ui.html ↗</a></td>
              </tr>
              <tr>
                <td><strong>MFE Clientes</strong> (mfe-customers)</td>
                <td><span class="port-chip">:4203</span></td>
                <td><strong>customers-service</strong></td>
                <td>Node.js / Express + TS</td>
                <td><span class="port-chip">:3002</span></td>
                <td><a href="http://localhost:3002/api-docs" target="_blank" class="link-swagger">/api-docs ↗</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 2.5rem auto;
      padding: 0 1.5rem;
    }
    .hero-card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2.5rem;
      margin-bottom: 3rem;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);
    }
    .hero-badge {
      display: inline-block;
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.4);
      color: #60a5fa;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.35rem 0.8rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
    }
    .hero-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }
    .hero-desc {
      font-size: 1.05rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    }
    .hero-desc strong {
      color: #e2e8f0;
    }
    .section-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1.5rem;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .mfe-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .mfe-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .card-icon {
      font-size: 2rem;
      background: #f1f5f9;
      padding: 0.5rem;
      border-radius: 12px;
    }
    .mfe-badge {
      font-size: 0.7rem;
      font-weight: 700;
      color: #2563eb;
      background: #eff6ff;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 0.25rem;
    }
    .card-header h3 {
      margin: 0;
      font-size: 1.15rem;
      color: #0f172a;
    }
    .card-text {
      font-size: 0.9rem;
      color: #64748b;
      line-height: 1.5;
      margin-bottom: 1.25rem;
    }
    .clean-arch-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
    }
    .clean-arch-tags span {
      font-size: 0.7rem;
      font-weight: 600;
      background: #f8fafc;
      color: #475569;
      border: 1px solid #e2e8f0;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f5f9;
      padding-top: 1rem;
    }
    .backend-tag {
      font-size: 0.75rem;
      font-weight: 600;
      color: #10b981;
    }
    .btn-primary {
      background: #2563eb;
      color: white;
      text-decoration: none;
      padding: 0.45rem 0.9rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .mapping-table-section {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .table-responsive {
      overflow-x: auto;
    }
    .arch-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }
    .arch-table th {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      padding: 0.85rem 1rem;
      border-bottom: 2px solid #e2e8f0;
    }
    .arch-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    .port-chip {
      background: #f1f5f9;
      color: #0284c7;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.8rem;
    }
    .link-swagger {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }
    .link-swagger:hover {
      text-decoration: underline;
    }
  `]
})
export class HomeComponent {}
