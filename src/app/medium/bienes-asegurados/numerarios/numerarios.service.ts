import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Numerario } from './numerario.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class NumerariosService  extends UnsubscribeOnDestroyAdapter{

  /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<Numerario[]> = new BehaviorSubject<Numerario[]>([]);
  dialogData!: Numerario;

  constructor(private httpClient: HttpClient) { 
    super();
    this.myServer = environment.server;
  }

  get data(){
    return this.dataChange.value;
  }

  getDialogData(){
    return this.dialogData;
  }

   /* CRUD PARA B_A_NUMERARIO */

   /* Obtener todos los registros */
   getAllNumerarios(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.httpClient.get<Numerario[]>(`${this.myServer}numerarios`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
   }

    /* Agregar un registro a B_A_NUMERARIO  */
    addNumerario(numerario: Numerario): Observable<Numerario>{
      this.dialogData = numerario;
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      const body = {...numerario};
      return this.httpClient.post<Numerario>(`${this.myServer}numerario/new`, body, { headers });
    }
}
