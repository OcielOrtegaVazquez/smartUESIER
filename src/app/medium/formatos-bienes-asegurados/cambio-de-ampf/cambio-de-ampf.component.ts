import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-cambio-de-ampf',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './cambio-de-ampf.component.html',
  styleUrl: './cambio-de-ampf.component.scss'
})
export class CambioDeAmpfComponent {

  breadscrums = [
    {
      title: 'Cambio de la persona AMPF',
      items: [],
      active: 'Cambio de la persona AMPF',
    },
  ];
}
