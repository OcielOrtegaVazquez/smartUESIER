import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { AcuerdoAseguramientoBienesComponent } from './acuerdo-aseguramiento-bienes.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { AcuerdoDeAseguramiento } from './acuerdo-aseguramiento-bienes.model';
import { CatTipoBien, CatFiscalia, CatAMPF, CatCargo, CatSituacionJuridica, CatLugarEntrega } from './acuerdo-aseguramiento-bienes.model';


@Injectable({
  providedIn: 'root'
})
export class AcuerdoAseguramientoBienesService extends UnsubscribeOnDestroyAdapter {

  /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<AcuerdoDeAseguramiento[]> = new BehaviorSubject<AcuerdoDeAseguramiento[]>([]);
  dialogData!: AcuerdoDeAseguramiento;

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

   /* CRUD PARA ACUERDO DE ASEGURAMIENTO */

   /*  OBTENER TODOS LOS REGISTROS */
   getAllAcuerdoDeAseguramiento(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.httpClient.get<AcuerdoDeAseguramiento[]>(`${this.myServer}formatos/acuerdo-de-aseguramiento`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + '' + error.message);
      }
    })
   }

   /* Agregar 1 registro de Acuerdo de Aseguramiento */
   addAcuerdoDeAseguramiento(acuerdoDeAseguramiento: AcuerdoDeAseguramiento): Observable<AcuerdoDeAseguramiento>{
    this.dialogData = acuerdoDeAseguramiento;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body = {...acuerdoDeAseguramiento};
    return this.httpClient.post<AcuerdoDeAseguramiento>(`${this.myServer}formatos/acuerdo-de-aseguramiento/new`, body, { headers });
   }

   /* Editar 1 registro de Acuerdo de Aseguramiento */
   editAcuerdoDeAseguramiento(acuerdoDeAseguramiento: AcuerdoDeAseguramiento): Observable<AcuerdoDeAseguramiento>{
    this.dialogData = acuerdoDeAseguramiento;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body = {...acuerdoDeAseguramiento };
    return this.httpClient.put<AcuerdoDeAseguramiento>(`${this.myServer}formatos/acuerdo-de-aseguramiento/edit`, body, { headers });
   }

   /* Obtener catalogo de bienes */
   getAllTipoBien(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatTipoBien[]>(`${this.myServer}/catTipoBien`, { headers }).toPromise().then(data => {
      return data;
    });
   }

   /*Obtener catalogo de fiscalias*/
   getAllFiscalias(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.get<CatFiscalia[]>(`${this.myServer}/catFiscalia`, { headers }).toPromise().then(data => {
      return data;
    })
   }

   /*Obtener catálogo de Empleados*/
   getAllAMPF() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.get<CatAMPF[]>(`${this.myServer}/catAMPF`, { headers }).toPromise().then(data => {
      return data;
    })
   }

   /*Obtener catálogo de cargos*/
   getAllCargo(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatCargo[]>(`${this.myServer}/catCargo`, { headers }).toPromise().then(data => {
      return data;
    })
   }

   /*Obtener catálogo de situación jurídica*/
   getAllSituacionJuridica(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatSituacionJuridica[]>(`${this.myServer}/catSituacionJuridica`, { headers }).toPromise().then(data => {
      return data; 
    })
   }

   /*Obtener catalogo de lugar de entrega*/
    getAllLugarEntrega(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      return this.httpClient.get<CatLugarEntrega[]>(`${this.myServer}/catLugarEntrega`, { headers }).toPromise().then(data =>{
        return data;
      })
    }

}
