import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Aeronave } from './aeronaves/aeronave.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BienesAseguradosService extends UnsubscribeOnDestroyAdapter{

   /* declarar la variable de peticion al servidor */
   private myServer: string;
   isTblLoading = true;
   dataChange: BehaviorSubject<Aeronave[]> = new BehaviorSubject<Aeronave[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Aeronave;

  public miVariable$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    super();
       this.myServer = environment.server;
   }

   get data(): Aeronave[]{
    return this.dataChange.value;
   }

   getDialogData(){
    return this.dialogData;
   }

   /* CRUD PARA B_A_AERONAVES */

   /* Obtener todos los registros */
   getAllAeronaves(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<Aeronave[]>(`${this.myServer}aeronaves`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },error: (error: HttpErrorResponse) =>{
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    })
   }

   /* Agregar un registro a B_A_AERONAVES */
   addAeronave(aeronave: Aeronave): Observable<Aeronave>{
    this.dialogData = aeronave;
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const body = {...aeronave};
    return this.httpClient.post<Aeronave>(`${this.myServer}aeronave/new`, body, { headers});
   }

}
