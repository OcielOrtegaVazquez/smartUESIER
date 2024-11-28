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
import { SolicitudPeritajeService } from './solicitud-peritaje.service';
import { SolicitudPeritaje } from './solicitud-peritaje.model';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

@Component({
  selector: 'app-solicitud-peritaje',
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
  templateUrl: './solicitud-peritaje.component.html',
  styleUrl: './solicitud-peritaje.component.scss'
})
export class SolicitudPeritajeComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  breadscrums = [
    {
      title: 'Solicitud de peritaje',
      items: [],
      active: 'Solicitud de peritaje',
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
    'ID_CAT_TIPO_PERITAJE',
    'FOLIO_SOLICITUD_PERITAJE',
    'OFICIO_SOLICITUD_PERITAJE',
    'FECHA_SOLICITUD_PERITAJE',
    'ID_CAT_TIPO_DE_BIEN',
    'CARACTERISTICAS',
    'OBSERVACIONES',
    'FECHA_REGISTRO_SOLICITUD_PERITAJE'
  ]

  exampleDatabase!: SolicitudPeritajeService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<SolicitudPeritaje>(true, []);
  id?: number;
  solicitudPeritaje?: SolicitudPeritaje;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public solicitudPeritajeService: SolicitudPeritajeService,
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
    console.log('Hola desde solicitud de peritaje');
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
        solicitudPeritaje: this.solicitudPeritaje,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.solicitudPeritajeService.getDialogData()
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

  editCall(row: SolicitudPeritaje){
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        solicitudPeritaje: row,
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
          this.solicitudPeritajeService.getDialogData();
        
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
    this.exampleDatabase = new SolicitudPeritajeService(this.httpClient);
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
        'ID_CI': x.ID_CI,
        'FECHA CI': moment(x.FECHA_CI ).format("YYY-MM-DD"),
        'NUMERO DE REGISTRO EN JN': x.NUMERO_REGISTRO_EN_JN,
        'FISCALIA': x.ID_CAT_FISCALIA,
        'FISCALIA FEDERAL': x.ID_CAT_FISCALIA_FEDERAL,
        'EMPLEADO': x.ID_CAT_EMPLEADO,
        'ROL': x.ID_CAT_ROL,
        'TIPO DE PERITAJE': x.ID_CAT_TIPO_PERITAJE,
        'FOLIO DE SOLICITUD DE PERITAJE': x.FOLIO_SOLICITUD_PERITAJE,
        'OFICIO DE SOLICITUD PERITAJE': x.OFICIO_SOLICITUD_PERITAJE,
        'FECHA DE SOLICITUD DE PERITAJE': moment(x.FECHA_SOLICITUD_PERITAJE ).format("YYY-MM-DD"),
        'BIEN SUJETO A PERITAJE': x.ID_CAT_TIPO_DE_BIEN,
        'CARACTERISTICAS': x.CARACTERISTICAS,
        'OBSERVACIONES': x.OBSERVACIONES,
        'FECHA DE REGISTRO DE SOLICITUD DE PERITAJE': moment(x.FECHA_REGISTRO_SOLICITUD_PERITAJE ).format("YYY-MM-DD")
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

export class ExampleDataSource extends DataSource<SolicitudPeritaje>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: SolicitudPeritaje[] = [];
  renderedData: SolicitudPeritaje[] = [];

  constructor(
    public exampleDataBase: SolicitudPeritajeService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ){
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<SolicitudPeritaje[]>{
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page,
    ];

    this.exampleDataBase.getAllSolicitudDePeritaje();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.exampleDataBase.data
        .slice()
        .filter((solicitudPeritaje: SolicitudPeritaje) => {
          const serchStr = (
            solicitudPeritaje.ID +
            solicitudPeritaje.CI +
            solicitudPeritaje.ID_CI +
            solicitudPeritaje.FECHA_CI +
            solicitudPeritaje.NUMERO_REGISTRO_EN_JN +
            solicitudPeritaje.ID_CAT_FISCALIA +
            solicitudPeritaje.ID_CAT_FISCALIA_FEDERAL +
            solicitudPeritaje.ID_CAT_EMPLEADO +
            solicitudPeritaje.ID_CAT_ROL +
            solicitudPeritaje.ID_CAT_TIPO_PERITAJE +
            solicitudPeritaje.FOLIO_SOLICITUD_PERITAJE +
            solicitudPeritaje.OFICIO_SOLICITUD_PERITAJE +
            solicitudPeritaje.FECHA_SOLICITUD_PERITAJE +
            solicitudPeritaje.ID_CAT_TIPO_DE_BIEN +
            solicitudPeritaje.CARACTERISTICAS +
            solicitudPeritaje.OBSERVACIONES +
            solicitudPeritaje.FECHA_REGISTRO_SOLICITUD_PERITAJE            
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

  sortData(data: SolicitudPeritaje[]): SolicitudPeritaje[]{
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

        case 'ID_CAT_TIPO_PERITAJE	':
          [propertyA, propertyB] = [a.ID_CAT_TIPO_PERITAJE	, b.ID_CAT_TIPO_PERITAJE	];
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

