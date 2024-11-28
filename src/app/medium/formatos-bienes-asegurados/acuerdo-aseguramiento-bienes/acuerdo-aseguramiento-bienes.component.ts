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
import { AcuerdoAseguramientoBienesService } from './acuerdo-aseguramiento-bienes.service';
import { AcuerdoDeAseguramiento } from './acuerdo-aseguramiento-bienes.model';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

@Component({
  selector: 'app-acuerdo-aseguramiento-bienes',
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
  templateUrl: './acuerdo-aseguramiento-bienes.component.html',
  styleUrl: './acuerdo-aseguramiento-bienes.component.scss'
})
export class AcuerdoAseguramientoBienesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Acuerdo de aseguramiento de bienes',
      items: [],
      active: 'Aseguramientos',
    },
  ];

  displayedColumns = [
    'ID',
    'CI',
    'FECHA_CI',
    'ID_CAT_TIPO_DE_BIEN',
    'ID_CAT_FISCALIA',
    'FECHA_ACUERDO_ASEGURAMIENTO',
    'ID_CAT_SITUACION_JURIDICA',
    'ID_CAT_LUGAR_ENTREGA',
    'FOLIO_NOTIFICACION_URM_DF',
    'FECHA_NOTIFICACION_REGISTRO',
    'NUMERO_REGISTRO_EN_JN',
    'OBSERVACIONES'
  ];

  exampleDatabase!: AcuerdoAseguramientoBienesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<AcuerdoDeAseguramiento>(true, []);
  id?: number;
  acuerdoDeAseguramiento?: AcuerdoDeAseguramiento;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public acuerdoDeAseguramientoService: AcuerdoAseguramientoBienesService,
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
    console.log('hola desde Acuerdo de Aseguramiento');
    this.loadData();
  }

  refresh(){
    console.log('vamos a recargar los datos');
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
        acuerdoDeAseguramiento: this.acuerdoDeAseguramiento,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.acuerdoDeAseguramientoService.getDialogData()
        );
        this.privateRefreshTable();
        this.showNotificacion(
          'snackbar-success',
          'Registro Correcto ...!!!',
          'bottom',
          'center'
        );
        this.refresh();
      }
    });
  }

  editCall(row: AcuerdoDeAseguramiento){
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        acuerdoDeAseguramiento: row,
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
          this.acuerdoDeAseguramientoService.getDialogData();

        this.privateRefreshTable();
        this.showNotificacion(
          'black',
          'Edit Record Successfully...!!!',
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

  privateRefreshTable() {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle() {}

  removeSelectedRows() {
    console.log('eliminar seleccionados');
  }

  public loadData(){
    this.exampleDatabase = new AcuerdoAseguramientoBienesService(this.httpClient);
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
        'FECHA CI': moment(x.FECHA_CI	).format("YYYY-MM-DD"),
        'FISCALIA ESPECIAL': x.ID_CAT_FISCALIA	,
        'EMPLEADO': x.ID_CAT_EMPLEADO,
        'ROL': x.ID_CAT_ROL,
        'FECHA ACUERDO ASEGURAMIENTO': moment(x.FECHA_ACUERDO_ASEGURAMIENTO	).format("YYYY-MM-DD"),
        'SITUACION JURÍDICA': x.ID_CAT_SITUACION_JURIDICA,
        'LUGAR DE ENTREGA': x.ID_CAT_LUGAR_ENTREGA,
        'DIRECCIÓN DE ENTREGA': x.DIRECCION_LUGAR_ENTREGA,
        'FOLIO DE NOTIFICACION URM DF': x.FOLIO_NOTIFICACION_URM_DF,
        'FECHA NOTIFICACIÓN DE REGISTRO': moment(x.FECHA_NOTIFICACION_REGISTRO		).format("YYYY-MM-DD"),
        'NÚMERO DE REGISTRO EN JN': x.NUMERO_REGISTRO_EN_JN,
        'OBSERVACIONES': x.OBSERVACIONES,
        'FECHA DE REGISTRO DE ACUERDO': moment(x.FECHA_REGISTRO_DE_ACUERDO_ASEGURAMIENTO	).format("YYYY-MM-DD"),
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

export class ExampleDataSource extends DataSource<AcuerdoDeAseguramiento>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: AcuerdoDeAseguramiento[] = [];
  renderedData: AcuerdoDeAseguramiento[] = [];

  constructor(
    public exampleDataBase: AcuerdoAseguramientoBienesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ){
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<AcuerdoDeAseguramiento[]>{
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page,
    ];

    this.exampleDataBase.getAllAcuerdoDeAseguramiento();
    return merge(...displayDataChanges).pipe(
      map(() => {
        //filter data
        this.filteredData = this.exampleDataBase.data
        .slice()
        .filter((acuerdoDeAseguramiento: AcuerdoDeAseguramiento) => {
          const serchStr = (
            acuerdoDeAseguramiento.ID +
            acuerdoDeAseguramiento.CI +
            acuerdoDeAseguramiento.ID_CI +
            acuerdoDeAseguramiento.FECHA_CI +
            acuerdoDeAseguramiento.ID_CAT_TIPO_DE_BIEN +
            acuerdoDeAseguramiento.ID_CAT_FISCALIA +
            acuerdoDeAseguramiento.FECHA_ACUERDO_ASEGURAMIENTO +
            acuerdoDeAseguramiento.ID_CAT_SITUACION_JURIDICA +
            acuerdoDeAseguramiento.ID_CAT_LUGAR_ENTREGA +
            acuerdoDeAseguramiento.FOLIO_NOTIFICACION_URM_DF +
            acuerdoDeAseguramiento.FECHA_NOTIFICACION_REGISTRO +
            acuerdoDeAseguramiento.NUMERO_REGISTRO_EN_JN +
            acuerdoDeAseguramiento.OBSERVACIONES
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

  disconnect() {}

  sortData(data: AcuerdoDeAseguramiento[]): AcuerdoDeAseguramiento[] {
    if (!this._sort.active || this._sort.direction === '') {
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

        case 'ID_CAT_SITUACION_JURIDICA	':
          [propertyA, propertyB] = [a.ID_CAT_SITUACION_JURIDICA	, b.ID_CAT_SITUACION_JURIDICA	];
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

