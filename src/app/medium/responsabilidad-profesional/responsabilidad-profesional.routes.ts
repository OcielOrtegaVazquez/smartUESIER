import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { DashboardResponsabilidadProfesionalComponent } from '../dashboard-responsabilidad-profesional/dashboard-responsabilidad-profesional.component';
import { MedicaComponent } from './medica/medica.component';

export const RESPONSABILIDAD_PROFESIONAL:  Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardResponsabilidadProfesionalComponent
    },
    {
        path: 'medica',
        component: MedicaComponent
    },
    {
        path: '**',
        component: Page404Component
    }
];