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
import { EntregaDeMuestrasAlCfpfService } from './entrega-de-muestras-al-cfpf.service';
import { EntregaDeMuestras } from './entrega-de-muestras-al-cfpf.model';
import { FormAddComponent } from './form-add/form-add.component';


@Component({
  selector: 'app-entrega-de-muestras-al-cfpf',
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
  templateUrl: './entrega-de-muestras-al-cfpf.component.html',
  styleUrl: './entrega-de-muestras-al-cfpf.component.scss'
})
export class EntregaDeMuestrasAlCfpfComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Entrega de muestras representativas',
      items: [],
      active: 'Entrega de muestras representativas',
    },
  ];

  displayedColumns = [
    'ID',
    'CI',
    'FECHA_CI',
    'NUMERO_REGISTRO_EN_JN',
    'ID_CAT_FISCALIA',
    'ID_CAT_FISCALIA_FEDERAL',
    'ID_CAT_TIPO_OBJETO',
    'ID_CAT_EMPLEADO_ENTREGA',
    'ID_CAT_ROL_ENTREGA',
    'ID_CAT_EMPLEADO_RECIBE',
    'ID_CAT_ROL_RECIBE',
    'FECHA_ENTREGA_MUESTRA',
    'ID_CAT_TIPO_DE_BIEN',
    'CARACTERISTICAS',
    'FOLIO_ENTREGA_RECEPCION',
    'OFICIO_ENTREGA_RECEPCION',
    'FECHA_ENTREGA_RECEPCION',
    'OBSERVACIONES',
    'FECHA_REGISTRO_ENTREGA_MUESTRA'
  ];

  exampleDatabase!: EntregaDeMuestrasAlCfpfService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<EntregaDeMuestras>(true, []);
  id?: number;
  entregaDeMuestras?: EntregaDeMuestras;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public entregaDeMuestrasAlCfpfService: EntregaDeMuestrasAlCfpfService,
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
    console.log('Hola desde entrega de muestras al cfpf');
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
        entregaDeMuestras: this.entregaDeMuestras,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.entregaDeMuestrasAlCfpfService.getDialogData()
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

  editCall(row: EntregaDeMuestras){
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        entregaDeMuestras: row,
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
          this.entregaDeMuestrasAlCfpfService.getDialogData();
        
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
    this.exampleDatabase = new EntregaDeMuestrasAlCfpfService(this.httpClient);
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
        'TIPO DE OBJETO': x.ID_CAT_TIPO_OBJETO,
        'EMPLEADO QUE ENTREGA EL BIEN': x.ID_CAT_EMPLEADO_ENTREGA,
        'ROL EMPLEADO QUE ENTREGA': x.ID_CAT_ROL_ENTREGA,
        'EMPLEADO QUE RECIBE EL BIEN': x.ID_CAT_EMPLEADO_RECIBE,
        'ROL EMPLEADO QUE RECIBE': x.ID_CAT_ROL_RECIBE,
        'FECHA ENTREGA MUESTRA': moment(x.FECHA_ENTREGA_MUESTRA).format("YYYY-MM-DD"),
        'TIPO DE BIEN': x.ID_CAT_TIPO_DE_BIEN,
        'CARACTERISTICAS': x.CARACTERISTICAS,
        'FOLIO ENTREGA RECEPCION': x.FOLIO_ENTREGA_RECEPCION,
        'OFICIO ENTREGA RECEPCION': x.OFICIO_ENTREGA_RECEPCION,
        'FECHA ENTREGA RECEPCION': moment(x.FECHA_ENTREGA_RECEPCION).format("YYYY-MM-DD"),
        'OBSERVACIONES': x.OBSERVACIONES,
        'FECHA DE REGISTRO DE ENTREGA DE MUESTRA': moment(x.FECHA_REGISTRO_ENTREGA_MUESTRA ).format("YYY-MM-DD")
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

export class ExampleDataSource extends DataSource<EntregaDeMuestras>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: EntregaDeMuestras[] = [];
  renderedData: EntregaDeMuestras[] = [];

  constructor(
    public exampleDataBase: EntregaDeMuestrasAlCfpfService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ){
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<EntregaDeMuestras[]>{
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page,
    ];

    this.exampleDataBase.getAllEntregaDeMuestras();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.exampleDataBase.data
        .slice()
        .filter((entregaDeMuestras: EntregaDeMuestras) => {
          const serchStr = (
            entregaDeMuestras.ID +
            entregaDeMuestras.CI +
            entregaDeMuestras.ID_CI +
            entregaDeMuestras.FECHA_CI +
            entregaDeMuestras.NUMERO_REGISTRO_EN_JN +
            entregaDeMuestras.ID_CAT_FISCALIA +
            entregaDeMuestras.ID_CAT_FISCALIA_FEDERAL +
            entregaDeMuestras.ID_CAT_TIPO_OBJETO +
            entregaDeMuestras.ID_CAT_EMPLEADO_ENTREGA +
            entregaDeMuestras.ID_CAT_ROL_ENTREGA +
            entregaDeMuestras.ID_CAT_EMPLEADO_RECIBE +
            entregaDeMuestras.ID_CAT_ROL_RECIBE + 
            entregaDeMuestras.FECHA_ENTREGA_MUESTRA +
            entregaDeMuestras.ID_CAT_TIPO_DE_BIEN +
            entregaDeMuestras.CARACTERISTICAS +
            entregaDeMuestras.FOLIO_ENTREGA_RECEPCION +
            entregaDeMuestras.OFICIO_ENTREGA_RECEPCION +
            entregaDeMuestras.FECHA_ENTREGA_RECEPCION +
            entregaDeMuestras.OBSERVACIONES +
            entregaDeMuestras.FECHA_REGISTRO_ENTREGA_MUESTRA
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

  sortData(data: EntregaDeMuestras[]): EntregaDeMuestras[]{
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

        case 'ID_CAT_TIPO_OBJETO	':
          [propertyA, propertyB] = [a.ID_CAT_TIPO_OBJETO	, b.ID_CAT_TIPO_OBJETO	];
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
