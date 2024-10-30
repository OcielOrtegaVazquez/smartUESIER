import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-destruccion-del-bien',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './destruccion-del-bien.component.html',
  styleUrl: './destruccion-del-bien.component.scss'
})
export class DestruccionDelBienComponent {
  breadscrums = [
    {
      title: 'Destrucción del bien',
      items: [],
      active: 'Destrucción del bien',
    },
  ];

}
