import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-registro-aseguramiento',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './registro-aseguramiento.component.html',
  styleUrl: './registro-aseguramiento.component.scss'
})
export class RegistroAseguramientoComponent {

  breadscrums = [
    {
      title: 'Bienes Asegurados',
      items: [],
      active: 'Registro de Aseguramiento'
    }
  ];

}
