import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
import { Inmueble } from './inmueble.model';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService extends UnsubscribeOnDestroyAdapter {

   /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<Inmueble[]> = new BehaviorSubject<Inmueble[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Inmueble;

  constructor( private httpClient: HttpClient) { 
    super();
    this.myServer = environment.server;
  }

  get data(): Inmueble[]{
    return this.dataChange.value;
  }

  getDialogData(){
    return this.dialogData;
  }

     /* CRUD PARA B_A_EMBARCACIONES */

   /* Obtener todos los registros */
   getAllInmuebles(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<Inmueble[]>(`${this.myServer}inmuebles`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    })
   }

   /* Agregar un registro a B_A_INMUEBLES  */
   addInmueble(inmueble: Inmueble): Observable<Inmueble>{
    this.dialogData = inmueble;
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const body = {...inmueble};
    return this.httpClient.post<Inmueble>(`${this.myServer}inmueble/new`, body, { headers });
   }
}
