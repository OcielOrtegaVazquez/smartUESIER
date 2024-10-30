import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-entrega-recepcion-del-bien-nueva-ubicacion',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './entrega-recepcion-del-bien-nueva-ubicacion.component.html',
  styleUrl: './entrega-recepcion-del-bien-nueva-ubicacion.component.scss'
})
export class EntregaRecepcionDelBienNuevaUbicacionComponent {

  breadscrums = [
    {
      title: 'Recepción del bien en nueva ubicación',
      items: [],
      active: 'Recepción del bien en nueva ubicación',
    },
  ];

}
