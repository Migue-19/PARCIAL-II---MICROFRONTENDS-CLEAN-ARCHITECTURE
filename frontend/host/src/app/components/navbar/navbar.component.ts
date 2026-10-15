import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar-header">
      <div class="navbar-container">
        <div class="brand">
          <div class="brand-icon">⚡</div>
          <div class="brand-info">
            <span class="brand-title">Enterprise Portal</span>
            <span class="brand-subtitle">Microfrontends & Clean Architecture</span>
          </div>
        </div>

        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <span class="nav-icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/products" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📦</span>
            <span>Productos (MFE 1)</span>
          </a>
          <a routerLink="/orders" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">🛒</span>
            <span>Órdenes (MFE 2)</span>
          </a>
          <a routerLink="/customers" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">👥</span>
            <span>Clientes (MFE 3)</span>
          </a>
        </nav>

        <div class="navbar-status">
          <span class="status-indicator"></span>
          <span class="status-text">Host: 4200</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #f8fafc;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .navbar-container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0.85rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .brand-icon {
      font-size: 1.75rem;
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 12px;
      padding: 0.25rem 0.6rem;
    }
    .brand-title {
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.025em;
      display: block;
    }
    .brand-subtitle {
      font-size: 0.75rem;
      color: #94a3b8;
      display: block;
    }
    .nav-links {
      display: flex;
      gap: 0.5rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.55rem 0.95rem;
      border-radius: 8px;
      transition: all 0.2s ease-in-out;
    }
    .nav-item:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
    .nav-item.active {
      background: #2563eb;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
    }
    .navbar-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
    }
    .status-indicator {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }
    .status-text {
      font-size: 0.75rem;
      font-weight: 600;
      color: #34d399;
    }
  `]
})
export class NavbarComponent {}
