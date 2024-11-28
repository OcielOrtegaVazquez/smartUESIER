import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-declinacion-por-incompetencia',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './declinacion-por-incompetencia.component.html',
  styleUrl: './declinacion-por-incompetencia.component.scss'
})
export class DeclinacionPorIncompetenciaComponent {

  breadscrums = [
    {
      title: 'Declinación por incompetencia',
      items: [],
      active: 'Declinación por incompetencia',
    },
  ];

}
