import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-cambio-de-ubicacion-del-bien-para-resguardo',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './cambio-de-ubicacion-del-bien-para-resguardo.component.html',
  styleUrl: './cambio-de-ubicacion-del-bien-para-resguardo.component.scss'
})
export class CambioDeUbicacionDelBienParaResguardoComponent {

  breadscrums = [
    {
      title: 'Cambio de ubicación del bien',
      items: [],
      active: 'Cambio de ubicación del bien',
    },
  ];

}
