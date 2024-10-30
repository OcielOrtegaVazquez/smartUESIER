import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-entrega-de-muestras-al-cfpf',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './entrega-de-muestras-al-cfpf.component.html',
  styleUrl: './entrega-de-muestras-al-cfpf.component.scss'
})
export class EntregaDeMuestrasAlCfpfComponent {
  breadscrums = [
    {
      title: 'Entrega de muestras representativas',
      items: [],
      active: 'Entrega de muestras representativas',
    },
  ];

}
