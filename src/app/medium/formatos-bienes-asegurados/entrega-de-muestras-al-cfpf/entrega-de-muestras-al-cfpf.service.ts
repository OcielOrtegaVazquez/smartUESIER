import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntregaDeMuestras } from './entrega-de-muestras-al-cfpf.model';
import { CatFiscalia, CatFiscaliaFederal, CatTipoObjeto, CatAMPF, CatCargo, CatTipoBien } from './entrega-de-muestras-al-cfpf.model';

@Injectable({
  providedIn: 'root'
})
export class EntregaDeMuestrasAlCfpfService extends UnsubscribeOnDestroyAdapter {
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<EntregaDeMuestras[]> = new BehaviorSubject<EntregaDeMuestras[]>([]);
  dialogData!: EntregaDeMuestras;

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

  getAllEntregaDeMuestras(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    this.httpClient.get<EntregaDeMuestras[]>(`${this.myServer}formatos/entrega-de-muestras`,{ headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + '' + error.message);
      }
    })
  }

  addEntregaDeMuestras(entregaDeMuestras: EntregaDeMuestras): Observable<EntregaDeMuestras>{
    this.dialogData = entregaDeMuestras;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    const body = {...entregaDeMuestras};
    return this.httpClient.post<EntregaDeMuestras>(`${this.myServer}formatos/entrega-de-muestras/new`, body ,{ headers });
  }

  editEntregaDeMuestras(entregaDeMuestras: EntregaDeMuestras): Observable<EntregaDeMuestras>{
    this.dialogData = entregaDeMuestras;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body = {...entregaDeMuestras };
    return this.httpClient.put<EntregaDeMuestras>(`${this.myServer}formatos/entrega-de-muestras/edit`, body, { headers });
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

      /*obtener catalogo de tipo de objeto*/
      getAllTipoObjeto(){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.get<CatTipoObjeto[]>(`${this.myServer}/catTipoObjeto`, { headers}).toPromise().then(data => {
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
