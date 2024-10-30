import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-demanda-de-extincion-de-dominio',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './demanda-de-extincion-de-dominio.component.html',
  styleUrl: './demanda-de-extincion-de-dominio.component.scss'
})
export class DemandaDeExtincionDeDominioComponent {
  breadscrums = [
    {
      title: 'Demanda de extinción de dominio',
      items: [],
      active: 'Demanda de extinción de dominio',
    },
  ];

}
