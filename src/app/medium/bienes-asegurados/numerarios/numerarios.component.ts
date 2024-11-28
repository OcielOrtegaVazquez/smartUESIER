import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Numerario } from './numerario.model';
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
import { NumerariosService } from './numerarios.service';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

@Component({
  selector: 'app-numerarios',
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
    DatePipe,
  ],
  templateUrl: './numerarios.component.html',
  styleUrl: './numerarios.component.scss'
})
export class NumerariosComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Bienes Asegurados',
      items: [],
      active: 'Numerarios'
    }
  ];

  /* columnas de tabla  */
  displayedColumns = [
    'ID',
    'SEDE_SUBSEDE',
    'CI',
    'FECHA_CI',
    'DELITO',
    'ACTIONS'
  ];

  exampleDatabase!: NumerariosService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Numerario>(true, []);
  id?: number;
  numerario?: Numerario;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public numerariosService: NumerariosService,
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
      console.log("hola desde numerarios");
      this.loadData();
  }
  refresh(){
    console.log("vamos a recargar los datos");
    this.loadData();
  }

  addNew(){
    console.log("vamos a agregar un registro de numerario");
    let tempDirection: Direction;
    if(localStorage.getItem('isRtl') === 'true'){
      tempDirection = 'rtl';
    }else{
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        numerario: this.numerario,
        action: 'add'
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if(result === 1){
        this.exampleDatabase?.dataChange.value.unshift(
          this.numerariosService.getDialogData()
        );
        this.privateRefreshTable();
        this.showNotification(
          'snackbar-success',
          'Registro Correcto ...!!!',
          'bottom',
          'center'
        );
          this.refresh();
      }
    })

  }

  editCall(row : Numerario){
    this.id = row.ID
    let tempDirection: Direction;
    if(localStorage.getItem('isRtl') == 'true'){
      tempDirection = 'rtl';
    }else{
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        numerario: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if(result === 1 ){
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.ID === this.id
        );

        if(foundIndex != null && this.exampleDatabase){
          this.exampleDatabase.dataChange.value[foundIndex] =
          this.numerariosService.getDialogData();

          this.privateRefreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          )
        }
        this.refresh();
      }
    })
  }

  deleteItem(){

  }

  privateRefreshTable(){

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
    this.exampleDatabase = new NumerariosService(this.httpClient);
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
    console.log("exportar a excel");
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
      ID: x.ID,
      SEDE_SUBSEDE: x.SEDE_SUBSEDE,
      CI: x.CI,
      'FECHA_CI': moment(x.FECHA_CI).format("YYYY-MM-DD"),
      DELITO: x.DELITO,
      FECHA_ASEGURAMIENTO: moment(x.FECHA_ASEGURAMIENTO).format("YYYY-MM-DD"),
      MOTIVO_ASEGURAMIENTO: x.MOTIVO_ASEGURAMIENTO,
      EFECTIVO_CTA_BANCARIA: x.EFECTIVO_CTA_BANCARIA,
      TIPO_MONEDA: x.TIPO_MONEDA,
      IMPORTE: x.IMPORTE,
      ESTADO_CONSERVACION: x.ESTADO_CONSERVACION,
      AUT_APO: x.AUT_APO,
      CUENTA_BANCARIA_ASEG: x.CUENTA_BANCARIA_ASEG,
      TITULAR_CTA_ASEG: x.TITULAR_CTA_ASEG,
      OBSERVACIONES: x.OBSERVACIONES
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

  onContextMenu(){

  }

  

}

export class ExampleDataSource extends DataSource<Numerario>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }
  set filter(filter: string) {
    this.filterchange.next(filter);
  }
  filteredData: Numerario[] = [];
  renderedData: Numerario[] = [];

  constructor(public exampleDataBase: NumerariosService,
    public paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<Numerario[]> {
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page
    ];
    this.exampleDataBase.getAllNumerarios();
    return merge(...displayDataChanges).pipe(
      map(() => {
        //filter data
        this.filteredData = this.exampleDataBase.data
          .slice()
          .filter((numerarios: Numerario) => {
            const serchStr = (
              numerarios.ID +
              numerarios.SEDE_SUBSEDE +
              numerarios.CI +
              numerarios.FECHA_CI +
              numerarios.DELITO
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

  sortData(data: Numerario[]): Numerario[] {
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

        case 'SEDE_SUBSEDE':
          [propertyA, propertyB] = [a.SEDE_SUBSEDE, b.SEDE_SUBSEDE];
          break;

        case 'CI':
          [propertyA, propertyB] = [a.CI, b.CI];
          break;

        case 'FECHA_CI':
          [propertyA, propertyB] = [a.FECHA_CI, b.FECHA_CI];
          break;

        case 'DELITO':
          [propertyA, propertyB] = [a.DELITO, b.DELITO];
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