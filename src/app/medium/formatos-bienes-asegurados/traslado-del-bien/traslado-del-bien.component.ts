import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-traslado-del-bien',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './traslado-del-bien.component.html',
  styleUrl: './traslado-del-bien.component.scss'
})
export class TrasladoDelBienComponent {
  breadscrums = [
    {
      title: 'Traslado del bien',
      items: [],
      active: 'Traslado del bien',
    },
  ];
}
