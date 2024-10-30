import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-respuesta-de-procedencia-de-iniciar-juicio-de-extincion-de-dominio',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './respuesta-de-procedencia-de-iniciar-juicio-de-extincion-de-dominio.component.html',
  styleUrl: './respuesta-de-procedencia-de-iniciar-juicio-de-extincion-de-dominio.component.scss'
})
export class RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent {

  breadscrums = [
    {
      title: 'Respuesta sobre la procedencia de iniciar juicio de extinción de dominio',
      items: [],
      active: 'Respuesta sobre la procedencia de iniciar juicio de extinción de dominio',
    },
  ];

}
