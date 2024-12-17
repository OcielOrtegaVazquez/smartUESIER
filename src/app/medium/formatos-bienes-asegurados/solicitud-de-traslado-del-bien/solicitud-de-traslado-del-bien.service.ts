import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { SolicitudDeTrasladoDelBien } from './solicitud-de-traslado-del-bien.model';
import { CatFiscalia, CatFiscaliaFederal, CatAMPF, CatCargo, CatTipoBien, CatLugarEntrega } from './solicitud-de-traslado-del-bien.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDeTrasladoDelBienService extends UnsubscribeOnDestroyAdapter {
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<SolicitudDeTrasladoDelBien[]> = new BehaviorSubject<SolicitudDeTrasladoDelBien[]>([])
  dialogData!: SolicitudDeTrasladoDelBien;

  constructor(private httpClient: HttpClient){
    super();
    this.myServer = environment.server;
   }

   get data(){
    return this.dataChange.value;
   }

   getDialogData(){
    return this.dialogData;
   }

   getAllSolicitudTraslado(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    this.httpClient.get<SolicitudDeTrasladoDelBien[]>(`${this.myServer}formatos/solicitud-de-traslado`,{ headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + '' + error.message);
      }
    })
  }

  addSolicitudTraslado(solicitudDeTrasladoDelBien: SolicitudDeTrasladoDelBien): Observable<SolicitudDeTrasladoDelBien>{
    this.dialogData = solicitudDeTrasladoDelBien;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    const body = {...solicitudDeTrasladoDelBien};
    return this.httpClient.post<SolicitudDeTrasladoDelBien>(`${this.myServer}formatos/solicitud-de-traslado/new`, body ,{ headers });
  }

  editSolicitudTraslado(solicitudDeTrasladoDelBien: SolicitudDeTrasladoDelBien): Observable<SolicitudDeTrasladoDelBien>{
    this.dialogData = solicitudDeTrasladoDelBien;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body = {...solicitudDeTrasladoDelBien };
    return this.httpClient.put<SolicitudDeTrasladoDelBien>(`${this.myServer}formatos/solicitud-de-traslado/edit`, body, { headers });
   }

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

   /*Obtener catalogo de lugar de entrega*/
   getAllLugarEntrega(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatLugarEntrega[]>(`${this.myServer}/catLugarEntrega`, { headers }).toPromise().then(data =>{
      return data;
    })
  }

}
