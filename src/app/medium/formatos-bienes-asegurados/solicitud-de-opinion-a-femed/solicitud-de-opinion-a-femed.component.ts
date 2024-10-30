import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-solicitud-de-opinion-a-femed',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './solicitud-de-opinion-a-femed.component.html',
  styleUrl: './solicitud-de-opinion-a-femed.component.scss'
})
export class SolicitudDeOpinionAFemedComponent {
  breadscrums = [
    {
      title: 'Solicitud de opinion a la Fiscalía Especial en Materia de Extinción de Dominio',
      items: [],
      active: 'Solicitud de opinion a la Fiscalía Especial en Materia de Extinción de Dominio',
    },
  ];

}
