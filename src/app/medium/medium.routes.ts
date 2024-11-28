import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const MEDIUM_ROUTE: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'formatos-bienes-asegurados',
        loadChildren: () => import('./formatos-bienes-asegurados/formatos-bienes-asegurados.routes').then((m) => m.FORMATO_BIENES_ASEGURADOS_ROUTE)
    },
    {
        path: 'bienes-asegurados',
        loadChildren: () => import('./bienes-asegurados/bienes-asegurados.routes').then((m) => m.BIENES_ASEGURADOS_ROUTE)
        
    },
    {
        path: 'responsabilidad-profesional',
        loadChildren: () => import('./responsabilidad-profesional/responsabilidad-profesional.routes').then((m) => m.RESPONSABILIDAD_PROFESIONAL)
        
    },
    {
        path: 'estados-juridicos',
        loadChildren: () => import('./estados-juridicos/estados-juridicos.routes').then((m) => m.ESTADOS_JURIDICOS_ROUTE)
    },
    {
        path: '**',
        component: Page404Component
    }
]