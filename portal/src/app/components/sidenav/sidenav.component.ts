import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  isOpen = false;

  menuItems: MenuItem[] = [
    {
      id: 'reportes',
      label: 'Reportes',
      icon: '📊',
      expanded: false,
      children: [
        {
          id: 'reporte-diario',
          label: 'Reporte de Facturado Diario',
          icon: '📅',
          route: '/dashboard/reportes/diario'
        },
        {
          id: 'importe-mensual',
          label: 'Importe Facturado Mensual',
          icon: '📈',
          route: '/dashboard/reportes/mensual'
        },
        {
          id: 'detalle-facturado',
          label: 'Detalle de lo Facturado',
          icon: '📋',
          route: '/dashboard/reportes/detalle'
        }
      ]
    },
    {
      id: 'facturas',
      label: 'Facturas',
      icon: '🧾',
      expanded: false,
      children: [
        {
          id: 'descarga-xml-pdf',
          label: 'Descarga de XML y PDF Previos',
          icon: '💾',
          route: '/dashboard/facturas/descarga'
        },
        {
          id: 'cancelacion',
          label: 'Cancelación de Facturas',
          icon: '❌',
          route: '/dashboard/facturas/cancelacion'
        },
        {
          id: 'unidades',
          label: 'Alta y Modificación de Unidades',
          icon: '📦',
          route: '/dashboard/facturas/unidades'
        },
        {
          id: 'sellos-digitales',
          label: 'Alta y Modificación de Sellos Digitales',
          icon: '🔐',
          route: '/dashboard/facturas/sellos'
        },
        {
          id: 'codigos-materiales',
          label: 'Alta y Modificación de Códigos de Materiales Fiscales',
          icon: '🏷️',
          route: '/dashboard/facturas/materiales'
        }
      ]
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: '👥',
      route: '/dashboard/usuarios'
    },
    {
      id: 'alertas',
      label: 'Alertas y Notificaciones',
      icon: '🔔',
      expanded: false,
      children: [
        {
          id: 'alerta-cancelacion',
          label: 'Alerta de Cancelación de Facturas',
          icon: '⚠️',
          route: '/dashboard/alertas/cancelacion'
        },
        {
          id: 'sellos-expiran',
          label: 'Sellos Próximos a Expirar',
          icon: '⏰',
          route: '/dashboard/alertas/sellos-expiran'
        },
        {
          id: 'errores-pac',
          label: 'Errores Reportados por el PAC',
          icon: '🚨',
          route: '/dashboard/alertas/errores-pac'
        },
        {
          id: 'log-errores',
          label: 'Log de Errores',
          icon: '📄',
          route: '/dashboard/alertas/log-errores'
        }
      ]
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: '💬',
      route: '/dashboard/chat'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isCollapsed = true;
      this.isOpen = false;
    } else {
      this.isCollapsed = false;
      this.isOpen = true;
    }
  }

  toggleSidenav() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleMenuItem(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    } else if (item.route) {
      this.router.navigate([item.route]);
      if (this.isMobile) {
        this.isOpen = false;
      }
    }
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  closeSidenav() {
    if (this.isMobile) {
      this.isOpen = false;
    }
  }
}