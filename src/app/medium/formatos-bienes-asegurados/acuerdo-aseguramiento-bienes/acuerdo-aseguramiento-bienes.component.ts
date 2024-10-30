import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-acuerdo-aseguramiento-bienes',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './acuerdo-aseguramiento-bienes.component.html',
  styleUrl: './acuerdo-aseguramiento-bienes.component.scss'
})
export class AcuerdoAseguramientoBienesComponent {

  breadscrums = [
    {
      title: 'Acuerdo de aseguramiento de bienes',
      items: [],
      active: 'Acuerdo de aseguramiento de bienes',
    },
  ];

}
