import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatCausaOrigen, CatFiscalia, InicioDeCarpeta,CatAMPF, CatCargo, CatTipoDelito, CatFiscaliaFederal, CatFiscaliaEspecial, CatUnidad, CatTipoBien } from './inicio-de-carpet.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InicioDeCarpetaService extends UnsubscribeOnDestroyAdapter {

  /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<InicioDeCarpeta[]> = new BehaviorSubject<InicioDeCarpeta[]>([]);
  dialogData!: InicioDeCarpeta;


  constructor(private httpClient: HttpClient) {
    super();
    this.myServer = environment.server;
  }

  get data() {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /* CRUD PARA 01_INICIO DE CARPETA */

  /* OBTENER TODOS LOS REGISTROS */
  getAllInicioDeCarpeta() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.httpClient.get<InicioDeCarpeta[]>(`${this.myServer}formatos/inicio-de-carpeta`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + '' + error.message);
      }
    })
  }

  /* Agregar un registro a B_A_NUMERARIO  */
  addInicioDeCarpeta(inicioDeCarpeta: InicioDeCarpeta): Observable<InicioDeCarpeta> {
    this.dialogData = inicioDeCarpeta;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body = { ...inicioDeCarpeta };
    return this.httpClient.post<InicioDeCarpeta>(`${this.myServer}formatos/inicio-de-carpeta/new`, body, { headers });
  }

  /* Editar un registro */
  editInicioDeCarpeta(inicioDeCarpeta: InicioDeCarpeta): Observable<InicioDeCarpeta>{
    this.dialogData = inicioDeCarpeta;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body = {...inicioDeCarpeta};
    return this.httpClient.put<InicioDeCarpeta>(`${this.myServer}formatos/inicio-de-carpeta/edit`, body, { headers });
  }

  /* Obtener catalogo de AMPF */
  getAllAMPF() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    //return this.http.get<any>(`${this.baseUrl}/resumen-cmi`,{headers});
    return this.httpClient.get<CatAMPF[]>(`${this.myServer}/catAMPF`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Obtener catalogo de Cargo AMPF */
  getAllCargo() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatCargo[]>(`${this.myServer}/catCargo`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Obtener catalogo tipo delito */
  getAllTipoDelito() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatTipoDelito[]>(`${this.myServer}/catTipoDelito`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Obtener catalogo causa origen */
  getAllCausaOrigen(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatCausaOrigen[]>(`${this.myServer}/catCausaOrigen`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Obtener catalogo fiscalias */
  getAllFiscalias(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatFiscalia[]>(`${this.myServer}/catFiscalia`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Obtener catalogo fiscalias federales */
  getAllFiscaliasFederales(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.get<CatFiscaliaFederal[]>(`${this.myServer}/catFiscaliaFederal`, { headers }).toPromise().then(data => {
      return data;
    });
  }

 /* Obtener catalogo fiscalias federales*/
 getAllFiscaliasEspeciales(){
  const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  return this.httpClient.get<CatFiscaliaEspecial[]>(`${this.myServer}/catFiscaliaEspecial`, { headers }).toPromise().then(data => {
    return data;
  });
}

 /* Obtener catalogo unidades */
 getAllUnidades(){
  const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  return this.httpClient.get<CatUnidad[]>(`${this.myServer}/catUnidades`, { headers }).toPromise().then(data => {
    return data;
  });
}

 /* Obtener catalogo bienes */
 getAllTipoBien(){
  const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  return this.httpClient.get<CatTipoBien[]>(`${this.myServer}/catTipoBien`, { headers }).toPromise().then(data => {
    return data;
  });
}

}
