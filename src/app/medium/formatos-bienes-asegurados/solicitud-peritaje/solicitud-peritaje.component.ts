import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-solicitud-peritaje',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './solicitud-peritaje.component.html',
  styleUrl: './solicitud-peritaje.component.scss'
})
export class SolicitudPeritajeComponent {
  breadscrums = [
    {
      title: 'Solicitud de peritaje',
      items: [],
      active: 'Solicitud de peritaje',
    },
  ];

}
