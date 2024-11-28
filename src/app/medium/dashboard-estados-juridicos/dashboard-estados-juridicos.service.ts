import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
import { EstadoJuridico } from './dashboard-estados-juridicos.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosJuridicosService extends UnsubscribeOnDestroyAdapter {

  /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<EstadoJuridico[]> = new BehaviorSubject<EstadoJuridico[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: EstadoJuridico;

  constructor(private httpClient: HttpClient) {
    super();
    this.myServer = environment.server;
  }

  get data(): EstadoJuridico[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /* Obtener todos los registros */
  getAllEstadosJuridicosDashboard() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.httpClient.get<EstadoJuridico[]>(`${this.myServer}dashboard/estados-juridicos`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
  }

  

}
