import { Route } from "@angular/router";
import { DashboardEstadosJuridicosComponent } from "../dashboard-estados-juridicos/dashboard-estados-juridicos.component";
import { Page404Component } from '../../authentication/page404/page404.component';
import { HistorialEstadosJuridicosComponent } from "./historial-estados-juridicos/historial-estados-juridicos.component";

export const ESTADOS_JURIDICOS_ROUTE: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardEstadosJuridicosComponent
    },
    {
        path: 'justiciaNet',
        component: HistorialEstadosJuridicosComponent
    },
    {
        path: '**',
        component: Page404Component
    }
];