import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { EstadosJuridicosService } from './dashboard-estados-juridicos.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EstadoJuridico } from './dashboard-estados-juridicos.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard-estados-juridicos',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule],
  templateUrl: './dashboard-estados-juridicos.component.html',
  styleUrl: './dashboard-estados-juridicos.component.scss'
})
export class DashboardEstadosJuridicosComponent implements OnInit {

  /* declarar la variable de peticion al servidor */
  private myServer: string;
  isTblLoading = true;
  dataChange: BehaviorSubject<EstadoJuridico[]> = new BehaviorSubject<EstadoJuridico[]>([]);

  /* Desestructuracion por Fiscalias */
  arrayCAIA: EstadoJuridico[] = [];
  arrayFEAI: EstadoJuridico[] = [];
  arrayFECOC: EstadoJuridico[] = [];
  arrayFECOR: EstadoJuridico[] = [];
  arrayFEMCC: EstadoJuridico[] = [];
  arrayFEMDH: EstadoJuridico[] = [];
  arrayFEMDO: EstadoJuridico[] = [];
  arrayFISEL: EstadoJuridico[] = [];

  breadscrums = [
    {
      title: 'Dashboard Estados Juridicos',
      items: [],
      active: 'Dashboard',
    },
  ];

  constructor(private estadosJuridicosService: EstadosJuridicosService,
    private httpClient: HttpClient) {
    this.myServer = environment.server;
  }

  ngOnInit(): void {
    console.log("hola desde dashborad Estados juridicos");
    this.loadData();
  }


  loadData(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.httpClient.get<EstadoJuridico[]>(`${this.myServer}dashboard/estados-juridicos`, { headers }).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
        console.log(data);

        data.forEach(({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL }) => {
          switch (FISCALIA) {
            case 'CAIA':
              this.arrayCAIA.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FEAI':
              this.arrayFEAI.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FECOC':
              this.arrayFECOC.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FECOR':
              this.arrayFECOR.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FEMCC':
              this.arrayFEMCC.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FEMDH':
              this.arrayFEMDH.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FEMDO':
              this.arrayFEMDO.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;

            case 'FISEL':
              this.arrayFISEL.push({ FISCALIA, ULTIMO_MOVIMIENTO, TOTAL });
              break;
          }
        });


        const colsArrays = (arreglo: EstadoJuridico[]) =>{
          const colsSeparadas = {
            ULTIMO_MOVIMIENTO: arreglo.map(({ ULTIMO_MOVIMIENTO }) => ULTIMO_MOVIMIENTO),
            TOTAL: arreglo.map(({ TOTAL }) => TOTAL )
          }
          return colsSeparadas;
        };

        const colsCAIA = colsArrays(this.arrayCAIA);
        console.log(colsCAIA);

        console.log(this.arrayCAIA);
        console.log(this.arrayFEAI);
        console.log(this.arrayFECOC);
        console.log(this.arrayFECOR);
        console.log(this.arrayFEMCC);
        console.log(this.arrayFEMDH);
        console.log(this.arrayFEMDO);
        console.log(this.arrayFISEL);


      }, error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    });
  }



}
