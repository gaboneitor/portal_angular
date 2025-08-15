import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Dashboard Principal</h1>
        <p>Bienvenido al sistema de facturación automatizada</p>
      </div>
      
      <div class="dashboard-cards">
        <div class="card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <h3>Reportes</h3>
            <p>Consulta tus reportes de facturación</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-icon">🧾</div>
          <div class="card-content">
            <h3>Facturas</h3>
            <p>Gestiona tus facturas y documentos</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-icon">👥</div>
          <div class="card-content">
            <h3>Usuarios</h3>
            <p>Administra los usuarios del sistema</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-icon">🔔</div>
          <div class="card-content">
            <h3>Alertas</h3>
            <p>Revisa alertas y notificaciones</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .page-header {
      margin-bottom: 2rem;
    }
    
    .page-header h1 {
      font-size: 2rem;
      color: var(--gray-900);
      margin: 0 0 0.5rem 0;
    }
    
    .page-header p {
      color: var(--gray-600);
      margin: 0;
      font-size: 1.1rem;
    }
    
    .dashboard-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      border: 1px solid var(--gray-200);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    
    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .card-content h3 {
      font-size: 1.25rem;
      color: var(--gray-900);
      margin: 0 0 0.5rem 0;
    }
    
    .card-content p {
      color: var(--gray-600);
      margin: 0;
    }
  `]
})
export class HomeComponent {

}
