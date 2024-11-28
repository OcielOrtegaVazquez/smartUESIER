import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-resultado-de-dictamen-pericial',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './resultado-de-dictamen-pericial.component.html',
  styleUrl: './resultado-de-dictamen-pericial.component.scss'
})
export class ResultadoDeDictamenPericialComponent {

  breadscrums = [
    {
      title: 'Resultado dictamen pericial forense',
      items: [],
      active: 'Resultado dictamen pericial forense',
    },
  ];

}
