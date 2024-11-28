import { Route } from '@angular/router';
import { AeronavesComponent } from './aeronaves/aeronaves.component';
import { EmbarcacionesComponent } from './embarcaciones/embarcaciones.component';
import { NumerariosComponent } from './numerarios/numerarios.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { RegistroAseguramientoComponent } from './registro-aseguramiento/registro-aseguramiento.component';

export const BIENES_ASEGURADOS_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'registro-aseguramiento',
    component: RegistroAseguramientoComponent
  },
  {
    path: 'aeronaves',
    component: AeronavesComponent,
  },
  {
    path: 'embarcaciones',
    component: EmbarcacionesComponent,
  },
  {
    path: 'inmuebles',
    component: InmueblesComponent
  },
  {
    path: 'numerarios',
    component: NumerariosComponent,
  },
  {
    path: '**',
    component: Page404Component
  }
];
