import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-dashboard-formatos-bienes-asegurados',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './dashboard-formatos-bienes-asegurados.component.html',
  styleUrl: './dashboard-formatos-bienes-asegurados.component.scss'
})
export class DashboardFormatosBienesAseguradosComponent {

  breadscrums = [
    {
      title: 'Dashboard',
      items: [],
      active: 'dashboard',
    },
  ];

}
