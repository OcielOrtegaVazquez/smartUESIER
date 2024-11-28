import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
import { CommonModule } from '@angular/common';

export class TotalCi {
  TOTAL_CI: number
  constructor(totalCi: TotalCi){
    this.TOTAL_CI = totalCi.TOTAL_CI
  }
}

export class TotalCiEmbarcaciones {
  TOTAL_CI_EMBARCACIONES: number
  constructor(totalCiEmbarcaciones: TotalCiEmbarcaciones){
    this.TOTAL_CI_EMBARCACIONES = totalCiEmbarcaciones.TOTAL_CI_EMBARCACIONES
  }
}

export class TotalCiInmuebles {
  TOTAL_CI_INMUEBLES: number
  constructor(totalCiEmbarcaciones: TotalCiInmuebles){
    this.TOTAL_CI_INMUEBLES = totalCiEmbarcaciones.TOTAL_CI_INMUEBLES
  }
}

export class TotalCiNumerarios {
  TOTAL_CI_NUMERARIOS: number
  constructor(totalCiNumerarios: TotalCiNumerarios){
    this.TOTAL_CI_NUMERARIOS = totalCiNumerarios.TOTAL_CI_NUMERARIOS
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<TotalCi[]> = new BehaviorSubject<TotalCi[]>([]);
  dataChangeEmbarcaciones: BehaviorSubject<TotalCiEmbarcaciones[]> = new BehaviorSubject<TotalCiEmbarcaciones[]>([]);
  dataChangeInmuebles: BehaviorSubject<TotalCiInmuebles[]> = new BehaviorSubject<TotalCiInmuebles[]>([]);
  dataChangeNumerarios: BehaviorSubject<TotalCiNumerarios[]> = new BehaviorSubject<TotalCiNumerarios[]>([]);

  breadscrums = [
    {
      title: 'Dashboard Bienes Asegurados',
      items: [],
      active: 'Dashboard',
    },
  ];

  constructor (private httpClient: HttpClient){
    super();
    this.myServer = environment.server;
  }

  get data(): TotalCi[]{
    return this.dataChange.value;
  }

  get dataEmbarcaciones(): TotalCiEmbarcaciones[]{
    return this.dataChangeEmbarcaciones.value;
  }

  get dataInmuebles(): TotalCiInmuebles[]{
    return this.dataChangeInmuebles.value;
  }

  get dataNumerarios(): TotalCiNumerarios[]{
    return this.dataChangeNumerarios.value;
  }

  ngOnInit(): void {
    this.getTotalCiAeronaves();
    this.getTotalCiEmbarcaciones();
    this.getTotalCiInmuebles();
    this.getTotalCiNumerarios();
    
  }

  getTotalCiAeronaves(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<TotalCi[]>(`${this.myServer}dashboard/aeronaves-total`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },error: (error: HttpErrorResponse) =>{
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
  }

  getTotalCiEmbarcaciones(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<TotalCiEmbarcaciones[]>(`${this.myServer}dashboard/embarcaciones-total`, { headers }).subscribe({
      next: (dataEmbarcaciones) => {
        this.isTblLoading = false;
        this.dataChangeEmbarcaciones.next(dataEmbarcaciones);
      },error: (error: HttpErrorResponse) =>{
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
  }

  getTotalCiInmuebles(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<TotalCiInmuebles[]>(`${this.myServer}dashboard/inmuebles-total`, { headers }).subscribe({
      next: (dataInmuebles) => {
        this.isTblLoading = false;
        this.dataChangeInmuebles.next(dataInmuebles);
      },error: (error: HttpErrorResponse) =>{
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
  }

  getTotalCiNumerarios(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<TotalCiNumerarios[]>(`${this.myServer}dashboard/numerarios-total`, { headers }).subscribe({
      next: (dataNumerarios) => {
        this.isTblLoading = false;
        this.dataChangeNumerarios.next(dataNumerarios);
      },error: (error: HttpErrorResponse) =>{
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
  }




}
