import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultadoDictamenPericial } from './resultado-de-dictamen-pericial.model';
import { CatFiscalia, CatFiscaliaFederal, CatAMPF, CatCargo, CatTipoBien } from './resultado-de-dictamen-pericial.model';
@Injectable({
  providedIn: 'root'
})
export class ResultadoDeDictamenPericialService extends UnsubscribeOnDestroyAdapter {

  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<ResultadoDictamenPericial[]> = new BehaviorSubject<ResultadoDictamenPericial[]>([]);
  dialogData!: ResultadoDictamenPericial;

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

   /*CRUD PARA RESULTADO DE DICTAMEN PERICIAL*/

   /*OBTENER TODOS LOS REGISTROS*/
   getAllResultadoDictamenPericial(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    this.httpClient.get<ResultadoDictamenPericial[]>(`${this.myServer}/formatos/resultado-dictamen-pericial`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + '' + error.message);
      }
    })
   }

   /*Agregar un registro de RESULTADO DE DICTAMEN PERICIALe*/
   addResultadoDictamenPericial(resultadoDictamenPericial: ResultadoDictamenPericial): Observable<ResultadoDictamenPericial>{
    this.dialogData = resultadoDictamenPericial;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    const body = {...resultadoDictamenPericial};
    return this.httpClient.post<ResultadoDictamenPericial>(`${this.myServer}formatos/resultado-dictamen-pericial/new`, body, { headers });
   }

   /*Editar 1 registro de RESULTADO DE DICTAMEN PERICIAL*/
   editResultadoDictamenPericial(resultadoDictamenPericial: ResultadoDictamenPericial): Observable<ResultadoDictamenPericial>{
    this.dialogData = resultadoDictamenPericial;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    const body = {...resultadoDictamenPericial};
    return this.httpClient.put<ResultadoDictamenPericial>(`${this.myServer}formatos/resultado-dictamen-pericial/edit`, body, { headers });
   }

    /*obtener catalogo de fiscalias*/
    getAllFiscalias(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
      return this.httpClient.get<CatFiscalia[]>(`${this.myServer}/catFiscalia`, { headers }).toPromise().then(data => {
        return data;
      })
     }
      
     /*obtener catalogo de fiscalia federal*/
     getAllFiscaliasFederales(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
      return this.httpClient.get<CatFiscaliaFederal[]>(`${this.myServer}/catFiscaliaFederal`, { headers}).toPromise().then(data => {
        return data;
      })
     }
  
     /*obtener catalogo de empleados*/
     getAllAMPF(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
      return this.httpClient.get<CatAMPF[]>(`${this.myServer}/catAMPF`, { headers }).toPromise().then(data => {
        return data;
      })
     }
  
     /*obtener catalogo de cargo*/
     getAllCargo(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
      return this.httpClient.get<CatCargo[]>(`${this.myServer}/catCargo`, { headers }).toPromise().then(data => {
        return data;
      })
     }

     /*obtener catalogo tipo de bien*/
   getAllTipoBien(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.get<CatTipoBien[]>(`${this.myServer}/catTipoBien`, { headers }).toPromise().then(data => {
      return data;
    })
   }
}
