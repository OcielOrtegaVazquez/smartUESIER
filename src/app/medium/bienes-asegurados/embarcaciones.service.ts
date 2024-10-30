import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Embarcacion } from './embarcaciones/embarcacion.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmbarcacionesService extends UnsubscribeOnDestroyAdapter {

  /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<Embarcacion[]> = new BehaviorSubject<Embarcacion[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Embarcacion;

  constructor(private httpClient: HttpClient) {
    super();
    this.myServer = environment.server;
  }

  get data(): Embarcacion[]{
    return this.dataChange.value;
  }

  getDialogData(){
    return this.dialogData;
  }

   /* CRUD PARA B_A_EMBARCACIONES */

   /* Obtener todos los registros */
   getAllEmbarcaciones(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<Embarcacion[]>(`${this.myServer}embarcaciones`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },error: (error: HttpErrorResponse) =>{
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
   }

   /* Agregar un registro a B_A_EMBARCACIONES  */
   addEmbarcacion(embarcacion: Embarcacion): Observable<Embarcacion>{
    this.dialogData = embarcacion;
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const body = {...embarcacion};
    return this.httpClient.post<Embarcacion>(`${this.myServer}embarcacion/new`, body, { headers });

   }



}
