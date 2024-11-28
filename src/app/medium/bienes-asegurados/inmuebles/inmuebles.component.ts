import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
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
import { Inmueble } from './inmueble.model';
import { InmueblesService } from './inmuebles.service';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

@Component({
  selector: 'app-inmuebles',
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
  templateUrl: './inmuebles.component.html',
  styleUrl: './inmuebles.component.scss'
})
export class InmueblesComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  breadscrums = [
    {
      title: 'Bienes Asegurados',
      items: [],
      active: 'Inmuebles'
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

  exampleDatabase!: InmueblesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Inmueble>(true, []);
  id?: number;
  inmueble?: Inmueble;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public inmueblesService: InmueblesService,
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
      console.log("hola desde inmuebles");
      this.loadData();
  }

  refresh(){
    console.log("vamos a recargar los datos");
    this.loadData();
  }

  addNew(){
    console.log("vamos a agregar un registro de inmueble");
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        embarcacion: this.inmueble,
        action: 'add'
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.inmueblesService.getDialogData()
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

  editCall(row: Inmueble){
    this.id = row.ID
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        inmueble: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.ID === this.id
        );

        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.inmueblesService.getDialogData();

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
    this.exampleDatabase = new InmueblesService(this.httpClient);
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
        ID: x.ID,
        SEDE_SUBSEDE: x.SEDE_SUBSEDE,
        CI: x.CI,
        'FECHA_CI': moment(x.FECHA_CI).format("YYYY-MM-DD"),
        DELITO: x.DELITO,
        FECHA_ASEGURAMIENTO: moment(x.FECHA_ASEGURAMIENTO).format("YYYY-MM-DD"),
        MOTIVO_AEGURAMIENTO: x.MOTIVO_ASEGURAMIENTO,
        TIPO: x.TIPO,
        CALLE: x.CALLE,
        NUM_EXT: x.NUM_EXT,
        NUM_INT: x.NUM_INT,
        COLONIA: x.COLONIA,
        CODIGO_POSTAL: x.CODIGO_POSTAL,
        MUN_ALC: x.MUN_ALC,
        ENTIDAD_FED: x.ENTIDAD_FED,
        SUPERFICIE_TERR: x.SUPERFICIE_TERR,
        SUPERFICIE_CONST: x.SUPERFICIE_CONST,
        EDO_CONSERVACION: x.EDO_CONSERVACION,
        VALOR_DICTAMEN: x.VALOR_DICTAMEN,
        TIPO_MONEDA: x.TIPO_MONEDA,
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

  onContextMenu() {

  }
}

export class ExampleDataSource extends DataSource<Inmueble>{
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }
  set filter(filter: string) {
    this.filterchange.next(filter);
  }
  filteredData: Inmueble[] = [];
  renderedData: Inmueble[] = [];

  constructor(public exampleDataBase: InmueblesService,
    public paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<Inmueble[]> {
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page
    ];
    this.exampleDataBase.getAllInmuebles();
    return merge(...displayDataChanges).pipe(
      map(() => {
        //filter data
        this.filteredData = this.exampleDataBase.data
          .slice()
          .filter((inmueble: Inmueble) => {
            const serchStr = (
              inmueble.ID +
              inmueble.SEDE_SUBSEDE +
              inmueble.CI +
              inmueble.FECHA_CI +
              inmueble.DELITO
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

  sortData(data: Inmueble[]): Inmueble[] {
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
