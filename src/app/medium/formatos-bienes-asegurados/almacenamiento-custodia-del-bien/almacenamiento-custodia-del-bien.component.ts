import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-almacenamiento-custodia-del-bien',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './almacenamiento-custodia-del-bien.component.html',
  styleUrl: './almacenamiento-custodia-del-bien.component.scss'
})
export class AlmacenamientoCustodiaDelBienComponent {
  breadscrums = [
    {
      title: 'Almacenamiento y custodia del bien',
      items: [],
      active: 'Almacenamiento y custodia del bien',
    },
  ];

}
