import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-solicitud-de-traslado-del-bien',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './solicitud-de-traslado-del-bien.component.html',
  styleUrl: './solicitud-de-traslado-del-bien.component.scss'
})
export class SolicitudDeTrasladoDelBienComponent {

  breadscrums = [
    {
      title: 'Solicitud de traslado del bien',
      items: [],
      active: 'Solicitud de traslado del bien',
    },
  ];
}


