import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@
Component({
  selector: 'app-disposicion-final-bienes-no-administrables',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './disposicion-final-bienes-no-administrables.component.html',
  styleUrl: './disposicion-final-bienes-no-administrables.component.scss'
})
export class DisposicionFinalBienesNoAdministrablesComponent {
  breadscrums = [
    {
      title: 'Disposición final de bienes no administrables',
      items: [],
      active: 'Disposición final de bienes no administrables',
    },
  ];

}
