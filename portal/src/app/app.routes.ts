import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './pages/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'reportes/diario', component: HomeComponent}, // Placeholder
            {path: 'reportes/mensual', component: HomeComponent}, // Placeholder
            {path: 'reportes/detalle', component: HomeComponent}, // Placeholder
            {path: 'facturas/descarga', component: HomeComponent}, // Placeholder
            {path: 'facturas/cancelacion', component: HomeComponent}, // Placeholder
            {path: 'facturas/unidades', component: HomeComponent}, // Placeholder
            {path: 'facturas/sellos', component: HomeComponent}, // Placeholder
            {path: 'facturas/materiales', component: HomeComponent}, // Placeholder
            {path: 'usuarios', component: HomeComponent}, // Placeholder
            {path: 'alertas/cancelacion', component: HomeComponent}, // Placeholder
            {path: 'alertas/sellos-expiran', component: HomeComponent}, // Placeholder
            {path: 'alertas/errores-pac', component: HomeComponent}, // Placeholder
            {path: 'alertas/log-errores', component: HomeComponent}, // Placeholder
            {path: 'chat', component: HomeComponent}, // Placeholder
        ]
    }
];
