import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
import { SolicitudDeTrasladoDelBienService } from './solicitud-de-traslado-del-bien.service';
import { SolicitudDeTrasladoDelBien } from './solicitud-de-traslado-del-bien.model';
import { FormAddComponent } from './form-add/form-add.component';


@Component({
  selector: 'app-solicitud-de-traslado-del-bien',
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
    DatePipe
  ],
  templateUrl: './solicitud-de-traslado-del-bien.component.html',
  styleUrl: './solicitud-de-traslado-del-bien.component.scss'
})
export class SolicitudDeTrasladoDelBienComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Solicitud de traslado del bien',
      items: [],
      active: 'Solicitud de traslado del bien',
    },
  ];

  displayedColumns = [
    'ID',
    'CI',
    'FECHA_CI',
    'NUMERO_REGISTRO_EN_JN',
    'ID_CAT_FISCALIA',
    'ID_CAT_FISCALIA_FEDERAL',
    'ID_CAT_EMPLEADO',
    'ID_CAT_ROL',
    'FOLIO_SOLICITUD_TRASLADO',
    'OFICIO_SOLICITUD_TRASLADO',
    'FECHA_SOLICITUD_TRASLADO',
    'FECHA_PROGRAMADA_TRASLADO',
    'ID_CAT_TIPO_DE_BIEN',
    'CARACTERISTICAS',
    'ID_CAT_UBICACION_RESGUARDO',
    'ID_CAT_LUGAR_ENTREGA',
    'OBSERVACIONES',
    'FECHA_REGISTRO_SOLICITUD_TRASLADO'
  ];

  exampleDatabase!: SolicitudDeTrasladoDelBienService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<SolicitudDeTrasladoDelBien>(true, []);
  id?: number;
  solicitudDeTrasladoDelBien?: SolicitudDeTrasladoDelBien;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public solicitudDeTrasladoDelBienService: SolicitudDeTrasladoDelBienService,
    private snackBar: MatSnackBar
  ){
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    console.log('Hola desde solicitud de traslado del bien');
    this.loadData();
  }

  refresh(){
    console.log('Vamos a recargar los datos');
    this.loadData();
  }

  addNew(){
    console.log('vamos a agregar un nuevo registro');
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        solicitudDeTrasladoDelBien: this.solicitudDeTrasladoDelBien,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.solicitudDeTrasladoDelBienService.getDialogData()
        );
        this.privateRefreshTable();
        this.showNotificacion(
          'snackbar-success',
          'Registro correcto...!!!',
          'bottom',
          'center'
        );
        this.refresh();
      }
    });
  }

  editCall(row: SolicitudDeTrasladoDelBien){
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        solicitudDeTrasladoDelBien: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.ID === this.id);
      
      if (foundIndex != null && this.exampleDatabase) {
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.solicitudDeTrasladoDelBienService.getDialogData();
        
        this.privateRefreshTable();
        this.showNotificacion(
          'black',
          'Edit record successfully...!!!',
          'bottom',
          'center'
        );
  }
  this.refresh();
}
    });
  }

  deleteItem(){

  }

  privateRefreshTable(){}

  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle(){}

  removeSelectedRows() {
    console.log('Eliminar seleccionados');
  }

  public loadData(){
    this.exampleDatabase = new SolicitudDeTrasladoDelBienService(this.httpClient);
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
    console.log('exportar a excel');
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'ID': x.ID,
        'CI': x.CI,
        'FECHA_CI': moment(x.FECHA_CI).format("YYYY-MM-DD"),
        'NUMERO_REGISTRO_EN_JN': x.NUMERO_REGISTRO_EN_JN,
        'ID_CAT_FISCALIA': x.ID_CAT_FISCALIA,
        'ID_CAT_FISCALIA_FEDERAL': x.ID_CAT_FISCALIA_FEDERAL,
        'ID_CAT_EMPLEADO': x.ID_CAT_EMPLEADO,
        'ID_CAT_ROL': x.ID_CAT_ROL,
        'FOLIO_SOLICITUD_TRASLADO': x.FOLIO_SOLICITUD_TRASLADO,
        'OFICIO_SOLICITUD_TRASLADO': x.OFICIO_SOLICITUD_TRASLADO,
        'FECHA_SOLICITUD_TRASLADO': moment(x.FECHA_SOLICITUD_TRASLADO).format("YYYY-MM-DD"),
        'FECHA_PROGRAMADA_TRASLADO': moment(x.FECHA_PROGRAMADA_TRASLADO).format("YYYY-MM-DD"),
        'ID_CAT_TIPO_DE_BIEN': x.ID_CAT_TIPO_DE_BIEN,
        'CARACTERISTICAS': x.CARACTERISTICAS,
        'ID_CAT_UBICACION_RESGUARDO': x.ID_CAT_UBICACION_RESGUARDO,
        'ID_CAT_LUGAR_ENTREGA': x.ID_CAT_LUGAR_ENTREGA,
        'OBSERVACIONES': x.OBSERVACIONES,
        'FECHA_REGISTRO_SOLICITUD_TRASLADO': moment(x.FECHA_REGISTRO_SOLICITUD_TRASLADO).format("YYYY-MM-DD")
      }));
      TableExportUtil.exportToExcel(exportData, 'excel');
  }

  showNotificacion(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onContextMenu() {}

}

export class ExampleDataSource extends DataSource<SolicitudDeTrasladoDelBien>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: SolicitudDeTrasladoDelBien[] = [];
  renderedData: SolicitudDeTrasladoDelBien[] = [];

  constructor(
    public exampleDataBase: SolicitudDeTrasladoDelBienService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ){
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<SolicitudDeTrasladoDelBien[]>{
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page,
    ];

this.exampleDataBase.getAllSolicitudTraslado();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.exampleDataBase.data
        .slice()
        .filter((solicitudDeTrasladoDelBien: SolicitudDeTrasladoDelBien) => {
          const serchStr = (
            solicitudDeTrasladoDelBien.ID +
            solicitudDeTrasladoDelBien.CI +
            solicitudDeTrasladoDelBien.ID_CI +
            solicitudDeTrasladoDelBien.FECHA_CI +
            solicitudDeTrasladoDelBien.NUMERO_REGISTRO_EN_JN +
            solicitudDeTrasladoDelBien.ID_CAT_FISCALIA +
            solicitudDeTrasladoDelBien.ID_CAT_FISCALIA_FEDERAL +
            solicitudDeTrasladoDelBien.ID_CAT_EMPLEADO +
            solicitudDeTrasladoDelBien.ID_CAT_ROL +
            solicitudDeTrasladoDelBien.FOLIO_SOLICITUD_TRASLADO +
            solicitudDeTrasladoDelBien.OFICIO_SOLICITUD_TRASLADO + 
            solicitudDeTrasladoDelBien.FECHA_SOLICITUD_TRASLADO +
            solicitudDeTrasladoDelBien.FECHA_PROGRAMADA_TRASLADO +
            solicitudDeTrasladoDelBien.ID_CAT_TIPO_DE_BIEN +
            solicitudDeTrasladoDelBien.CARACTERISTICAS +
            solicitudDeTrasladoDelBien.ID_CAT_UBICACION_RESGUARDO +
            solicitudDeTrasladoDelBien.ID_CAT_LUGAR_ENTREGA +
            solicitudDeTrasladoDelBien.OBSERVACIONES +
            solicitudDeTrasladoDelBien.FECHA_REGISTRO_SOLICITUD_TRASLADO
          ).toLowerCase();
          return serchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        /* sort filtered data */
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

  disconnect(){}

  sortData(data: SolicitudDeTrasladoDelBien[]): SolicitudDeTrasladoDelBien[]{
    if(!this._sort.active || this._sort.direction === ''){
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';
      switch (this._sort.active) {
        case 'ID':
          [propertyA, propertyB] = [a.ID, b.ID];
          break;

        case 'CI':
          [propertyA, propertyB] = [a.CI, b.CI];
          break;

        case 'ID_CAT_TIPO_DE_BIEN	':
          [propertyA, propertyB] = [a.ID_CAT_TIPO_DE_BIEN	, b.ID_CAT_TIPO_DE_BIEN	];
          break;

        /* case 'ID_CAT_EMPLEADO':
          [propertyA, propertyB] = [a.ID_CAT_EMPLEADO, b.ID_CAT_EMPLEADO];
          break; */
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
