import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from '../../../shared/tableExportUtil';
import { TableElement } from '../../../shared/TableElement';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { DatePipe, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import * as moment from 'moment';
import { HistorialEstadosJuridicosService } from './historial-estados-juridicos.service';
import { HistorialEstadoJuridico } from './historial-estados-juridicos.model';

@Component({
  selector: 'app-historial-estados-juridicos',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,],
  templateUrl: './historial-estados-juridicos.component.html',
  styleUrl: './historial-estados-juridicos.component.scss'
})
export class HistorialEstadosJuridicosComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Estados Juridicos',
      items: [],
      active: 'Justici@Net',
    },
  ];

  /* columnas de tabla  */
  displayedColumns = [
    'id_CI',
    'CI',
    'FECHA_REGISTRO',
    'FISCALIA',
    'SEDES_ACTUAL',
    'ESTADO_JURIDICO',
    'FECHA_EDOJURIDICO',
    'ETAPA_PROCESAL',
    'ULTIMO_MOVIMIENTO',
    'ACTIONS'
  ]

  exampleDatabase!: HistorialEstadosJuridicosService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<HistorialEstadoJuridico>(true, []);
  id?: number;
  historial?: HistorialEstadoJuridico;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public historialService: HistorialEstadosJuridicosService,
    private snackBar: MatSnackBar,
  ){
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    console.log("Hola dede historial estados juridicos");
    this.loadData();
  }

  refresh(){
    console.log("vamos a recargar los datos");
    this.loadData();
  }

  addNew(){
    console.log("vamos a agregar un registro nuevo");
  }

  editCall(){
    console.log("vamos a editar el regsitro");
  }

  deleteItem(){
    console.log("vamos a borrar 1 registro");
  }

  privateRefeshTable(){

  }

  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle(){

  }

  removeSelectedRows(){
    console.log("eliminar seleccionados");
  }

  public loadData(){
    this.exampleDatabase = new HistorialEstadosJuridicosService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  exportExcel(){
    console.log("exportar a excel");
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        id_CI: x.id_CI,
        CI: x.CI,
        'FECHA_REGISTRO': moment(x.FECHA_REGISTRO).format("YYYY-MM-DD"),
        FISCALIA: x.FISCALIA,
        SEDES_ACTUAL: x.SEDES_ACTUAL,
        ESTADO_JURIDICO: x.ESTADO_JURIDICO,
        'FECHA_EDOJURIDICO': moment(x.FECHA_EDOJURIDICO).format("YYYY-MM-DD"),
        ETAPA_PROCESAL: x.ETAPA_PROCESAL,
        ULTIMO_MOVIMIENTO: x.ULTIMO_MOVIMIENTO,
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }


  showNotification(colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });

  }

  onContextMenu() {

  }


}

export class ExampleDataSource extends DataSource<HistorialEstadoJuridico>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }
  set filter(filter: string) {
    this.filterchange.next(filter);
  }
  filteredData: HistorialEstadoJuridico[] = [];
  renderedData: HistorialEstadoJuridico[] = [];

  constructor(public exampleDataBase: HistorialEstadosJuridicosService,
    public paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<HistorialEstadoJuridico[]> {
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page
    ];
    this.exampleDataBase.getAllHistorialEstadosJuridicos();
    return merge(...displayDataChanges).pipe(
      map(() => {
        //filter data
        this.filteredData = this.exampleDataBase.data
          .slice()
          .filter((historial: HistorialEstadoJuridico) => {
            const serchStr = (
              historial.id_CI +
              historial.CI +
              historial.FECHA_REGISTRO +
              historial.FISCALIA +
              historial.SEDES_ACTUAL +
              historial.ESTADO_JURIDICO +
              historial.FECHA_EDOJURIDICO +
              historial.ETAPA_PROCESAL +
              historial.ULTIMO_MOVIMIENTO              
            ).toLowerCase();
            return serchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        //sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        //grab the page's slice filtered sorted data
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {

  }

  sortData(data: HistorialEstadoJuridico[]): HistorialEstadoJuridico[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';
      switch (this._sort.active) {
        case 'id_CI':
          [propertyA, propertyB] = [a.id_CI, b.id_CI];
          break;

        case 'CI':
          [propertyA, propertyB] = [a.CI, b.CI];
          break;

        case 'FECHA_REGISTRO':
          [propertyA, propertyB] = [a.FECHA_REGISTRO, b.FECHA_REGISTRO];
          break;

        case 'FISCALIA':
          [propertyA, propertyB] = [a.FISCALIA, b.FISCALIA];
          break;

        case 'SEDES_ACTUAL':
          [propertyA, propertyB] = [a.SEDES_ACTUAL, b.SEDES_ACTUAL];
          break;

          case 'ESTADO_JURIDICO':
          [propertyA, propertyB] = [a.ESTADO_JURIDICO, b.ESTADO_JURIDICO];
          break;

          case 'FECHA_EDOJURIDICO':
          [propertyA, propertyB] = [a.FECHA_EDOJURIDICO, b.FECHA_EDOJURIDICO];
          break;

          case 'ETAPA_PROCESAL':
          [propertyA, propertyB] = [a.ETAPA_PROCESAL, b.ETAPA_PROCESAL];
          break;

          case 'ULTIMO_MOVIMIENTO':
          [propertyA, propertyB] = [a.ULTIMO_MOVIMIENTO, b.ULTIMO_MOVIMIENTO];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    })

  }



}
