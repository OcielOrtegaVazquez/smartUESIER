import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-medica',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './medica.component.html',
  styleUrl: './medica.component.scss'
})
export class MedicaComponent implements OnInit{




  breadscrums = [
    {
      title: 'Responsabilidad Profesional',
      items: [],
      active: 'Médica',
    },
  ];

  ngOnInit() {
      console.log("Hola desde Responsabilidad Profesional Médica");
  }

 



}