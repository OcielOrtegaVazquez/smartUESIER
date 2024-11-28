import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "@shared";
import { environment } from "environments/environment.development";
import { BienesDisposicion } from './bienes-a-disposicion.model';
import { CatTipoBien } from "../inicio-de-carpeta/inicio-de-carpet.model";

@Injectable({
    providedIn: 'root'
})

export class BienesDisposicionService extends UnsubscribeOnDestroyAdapter {

/* declarar la variable de peticion al servidor */
private myServer: string;
isTblLoading = true;
dataChange: BehaviorSubject<BienesDisposicion[]> = new BehaviorSubject<BienesDisposicion[]>([]);
dialogData!: BienesDisposicion;

constructor(private httpClient: HttpClient){
    super();
    this.myServer = environment.server
}

get data() {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /* CRUD PARA BIENES_A_DISPOSICION */

  /* OBTENER TODOS LOS REIGISTROS */
  getAllBienesDisposicion(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.httpClient.get<BienesDisposicion[]>(`${this.myServer}formatos/bienes-a-disposicion`, { headers }).subscribe({
        next: (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data);
        }, error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + '' + error.message);
        }
    });
  }

  /* Obtener 1 registro de 01_INICIO_DE_CARPETA */
  

  /* Agregar registro de 1 bien asegurado */
  addBienAsegurado(bienDisposicion: BienesDisposicion):Observable<BienesDisposicion>{
    this.dialogData = bienDisposicion;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body= {...bienDisposicion};
    return this.httpClient.post<BienesDisposicion>(`${this.myServer}formatos/bienes-a-disposicion/new`, body, { headers });
  }

  /* Editar un registro de 1 bien asegurado */
  editBienAsegurado(bienDisposicion: BienesDisposicion):Observable<BienesDisposicion>{
    this.dialogData = bienDisposicion;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const body= {...bienDisposicion};
    return this.httpClient.put<BienesDisposicion>(`${this.myServer}formatos/bienes-a-disposicion/edit`, body, { headers });
  }

   /* Obtener catalogo bienes */
 getAllTipoBien(){
  const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  return this.httpClient.get<CatTipoBien[]>(`${this.myServer}/catTipoBien`, { headers }).toPromise().then(data => {
    return data;
  });
}


}