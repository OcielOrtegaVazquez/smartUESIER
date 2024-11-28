import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistorialEstadoJuridico } from './historial-estados-juridicos.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HistorialEstadosJuridicosService extends UnsubscribeOnDestroyAdapter{

   /* declarar la variable de peticion al servidor */
   private myServer: string;
   isTblLoading = true;
   dataChange: BehaviorSubject<HistorialEstadoJuridico[]> = new BehaviorSubject<HistorialEstadoJuridico[]>([]);
   // Temporarily stores data from dialogs
  dialogData!: HistorialEstadoJuridico;

  constructor( private httpClient: HttpClient) {
    super ();
    this.myServer = environment.server
   }

   get data(): HistorialEstadoJuridico[]{
    return this.dataChange.value;
  }

  getDialogData(){
    return this.dialogData;
  }

   /* CRUD PARA sam.VW_Estado_JuridicoCI */

   /* Obtener todos los registros */
   getAllHistorialEstadosJuridicos(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
     this.httpClient.get<HistorialEstadoJuridico[]>(`${this.myServer}estados-juridicos/justiciaNet`, { headers }).subscribe({
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
