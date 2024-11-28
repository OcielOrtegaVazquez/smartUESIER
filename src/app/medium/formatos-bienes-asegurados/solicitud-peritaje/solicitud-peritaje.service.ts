import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { SolicitudPeritaje } from './solicitud-peritaje.model';
import { CatFiscalia, CatFiscaliaFederal, CatAMPF, CatCargo,CatTipoPeritaje, CatTipoBien } from './solicitud-peritaje.model';


@Injectable({
  providedIn: 'root'
})
export class SolicitudPeritajeService extends UnsubscribeOnDestroyAdapter {

  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<SolicitudPeritaje[]> = new BehaviorSubject<SolicitudPeritaje[]>([]);
  dialogData!: SolicitudPeritaje;
 
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

   /*CRUD PARA SOLICITUD DE PERITAJE*/

   /*OBTENER TODOS LOS REGISTROS*/
   getAllSolicitudDePeritaje(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    this.httpClient.get<SolicitudPeritaje[]>(`${this.myServer}formatos/solicitud-de-peritaje`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + '' + error.message);
      }
    })
   }

   /*Agregar un registro de solicitud de peritaje*/
   addSolicitudDePeritaje(solicitudDePeritaje: SolicitudPeritaje): Observable<SolicitudPeritaje>{
    this.dialogData = solicitudDePeritaje;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    const body = {...solicitudDePeritaje};
    return this.httpClient.post<SolicitudPeritaje>(`${this.myServer}formatos/solicitud-de-peritaje/new`, body, { headers });
   }

   /*Editar 1 registro de Solicitud de peritaje*/
   editSolicitudDePeritaje(solicitudDePeritaje: SolicitudPeritaje): Observable<SolicitudPeritaje>{
    this.dialogData = solicitudDePeritaje;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    const body = {...solicitudDePeritaje};
    return this.httpClient.put<SolicitudPeritaje>(`${this.myServer}formatos/solicitud-de-peritaje/edit`, body, { headers });
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

   /*obtener catalogo de tipo peritaje*/
   getAllTipoPeritaje(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.get<CatTipoPeritaje[]>(`${this.myServer}/catTipoPeritaje`, { headers }).toPromise().then(data => {
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
