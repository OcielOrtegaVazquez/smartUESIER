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
import { ResultadoDeDictamenPericialService } from './resultado-de-dictamen-pericial.service';
import { ResultadoDictamenPericial } from './resultado-de-dictamen-pericial.model';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

@Component({
  selector: 'app-resultado-de-dictamen-pericial',
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
  templateUrl: './resultado-de-dictamen-pericial.component.html',
  styleUrl: './resultado-de-dictamen-pericial.component.scss'
})
export class ResultadoDeDictamenPericialComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Resultado dictamen pericial forense',
      items: [],
      active: 'Resultado dictamen pericial forense',
    },
  ];

  displayedColumns = [
    'ID',
    'CI',
    'FECHA_CI',
    'NUMERO_REGISTRO_EN_JN',
    'ID_CAT_FISCALIA',
    'ID_CAT_FISCALIA_FEDERAL',
    'ID_CAT_EMPLEADO_REALIZA_PERITAJE',
    'ID_CAT_ROL_REALIZA_PERITAJE',
    'ID_CAT_EMPLEADO_FIRMA_DICTAMEN',
    'ID_CAT_ROL_FIRMA_DICTAMEN',
    'ID_CAT_TIPO_DE_BIEN',
    'CARACTERISTICAS',
    'FOLIO_DICTAMEN_PERICIAL',
    'OFICIO_DICTAMEN_PERICIAL',
    'FECHA_DICTAMEN_PERICIAL',
    'FOLIO_ENTREGA_DICTAMEN_PERICIAL',
    'OFICIO_ENTREGA_DICTAMEN_PERICIAL',
    'FECHA_ENTREGA_DICTAMEN_PERICIAL',
    'OBSERVACIONES',
    'FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL'
  ]

  exampleDatabase!: ResultadoDeDictamenPericialService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<ResultadoDictamenPericial>(true, []);
  id?: number;
  resultadoDictamenPericial?: ResultadoDictamenPericial;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public resultadoDeDictamenPericialService: ResultadoDeDictamenPericialService,
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
    console.log('Hola desde resultado de dictamen pericial');
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
        resultadoDictamenPericial: this.resultadoDictamenPericial,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.resultadoDeDictamenPericialService.getDialogData()
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

  editCall(row: ResultadoDictamenPericial){
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        resultadoDictamenPericial: row,
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
          this.resultadoDeDictamenPericialService.getDialogData();
        
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
    this.exampleDatabase = new ResultadoDeDictamenPericialService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if(!this.dataSource){
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    )
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
        'ID_CAT_EMPLEADO_REALIZA_PERITAJE': x.ID_CAT_EMPLEADO_REALIZA_PERITAJE,
        'ID_CAT_ROL_REALIZA_PERITAJE': x.ID_CAT_ROL_REALIZA_PERITAJE,
        'ID_CAT_EMPLEADO_FIRMA_DICTAMEN': x.ID_CAT_EMPLEADO_FIRMA_DICTAMEN,
        'ID_CAT_ROL_FIRMA_DICTAMEN': x.ID_CAT_ROL_FIRMA_DICTAMEN,
        'ID_CAT_TIPO_DE_BIEN': x.ID_CAT_TIPO_DE_BIEN,
        'CARACTERISTICAS': x.CARACTERISTICAS,
        'FOLIO_DICTAMEN_PERICIAL': x.FOLIO_DICTAMEN_PERICIAL,
        'OFICIO_DICTAMEN_PERICIAL': x.OFICIO_DICTAMEN_PERICIAL,
        'FECHA_DICTAMEN_PERICIAL': moment(x.FECHA_DICTAMEN_PERICIAL ).format("YYY-MM-DD"),
        'FOLIO_ENTREGA_DICTAMEN_PERICIAL': x.FOLIO_ENTREGA_DICTAMEN_PERICIAL,
        'OFICIO_ENTREGA_DICTAMEN_PERICIAL': x.OFICIO_ENTREGA_DICTAMEN_PERICIAL,
        'FECHA_ENTREGA_DICTAMEN_PERICIAL': moment(x.FECHA_ENTREGA_DICTAMEN_PERICIAL ).format("YYY-MM-DD"),
        'OBSERVACIONES': x.OBSERVACIONES,
        'FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL': moment(x.FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL ).format("YYY-MM-DD"),

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
export class ExampleDataSource extends DataSource<ResultadoDictamenPericial>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: ResultadoDictamenPericial[] = [];
  renderedData: ResultadoDictamenPericial[] = [];

  constructor(
    public exampleDataBase: ResultadoDeDictamenPericialService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ){
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<ResultadoDictamenPericial[]>{
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page,
    ];

    this.exampleDataBase.getAllResultadoDictamenPericial();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.exampleDataBase.data
        .slice()
        .filter((resultadoDictamenPericial: ResultadoDictamenPericial) => {
          const serchStr = (
            resultadoDictamenPericial.ID +
            resultadoDictamenPericial.CI +
            resultadoDictamenPericial.ID_CI +
            resultadoDictamenPericial.FECHA_CI +
            resultadoDictamenPericial.NUMERO_REGISTRO_EN_JN +
            resultadoDictamenPericial.ID_CAT_FISCALIA +
            resultadoDictamenPericial.ID_CAT_FISCALIA_FEDERAL +
            resultadoDictamenPericial.ID_CAT_EMPLEADO_REALIZA_PERITAJE +
            resultadoDictamenPericial.ID_CAT_ROL_REALIZA_PERITAJE +
            resultadoDictamenPericial.ID_CAT_EMPLEADO_FIRMA_DICTAMEN +
            resultadoDictamenPericial.ID_CAT_ROL_FIRMA_DICTAMEN +
            resultadoDictamenPericial.ID_CAT_TIPO_DE_BIEN +
            resultadoDictamenPericial.CARACTERISTICAS +
            resultadoDictamenPericial.FOLIO_DICTAMEN_PERICIAL +
            resultadoDictamenPericial.OFICIO_DICTAMEN_PERICIAL +
            resultadoDictamenPericial.FECHA_DICTAMEN_PERICIAL +
            resultadoDictamenPericial.FOLIO_ENTREGA_DICTAMEN_PERICIAL +
            resultadoDictamenPericial.OFICIO_ENTREGA_DICTAMEN_PERICIAL +
            resultadoDictamenPericial.FECHA_ENTREGA_DICTAMEN_PERICIAL +
            resultadoDictamenPericial.OBSERVACIONES +
            resultadoDictamenPericial.FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL            
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
 
   sortData(data: ResultadoDictamenPericial[]): ResultadoDictamenPericial[]{
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
 
         case 'ID_CAT_TIPO_DE_BIEN':
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

