import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-devolucion-del-bien',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './devolucion-del-bien.component.html',
  styleUrl: './devolucion-del-bien.component.scss'
})
export class DevolucionDelBienComponent {

  breadscrums = [
    {
      title: 'Devolución del bien',
      items: [],
      active: 'Devolución del bien',
    },
  ];
}
