import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-disposicion-final-por-conclusion',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './disposicion-final-por-conclusion.component.html',
  styleUrl: './disposicion-final-por-conclusion.component.scss'
})
export class DisposicionFinalPorConclusionComponent {
  breadscrums = [
    {
      title: 'Disposición final del bien por conclusión del asunto',
      items: [],
      active: 'Disposición final del bien por conclusión del asunto',
    },
  ];

}
