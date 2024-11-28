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
import { BienesDisposicionService } from './bienes-a-disposicion.service';
import { BienesDisposicion } from './bienes-a-disposicion.model';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

@Component({
  selector: 'app-bienes-a-disposicion',
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
  templateUrl: './bienes-a-disposicion.component.html',
  styleUrl: './bienes-a-disposicion.component.scss',
})
export class BienesADisposicionComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  breadscrums = [
    {
      title: 'Bienes a Disposicion',
      items: [],
      active: 'Bienes a Disposicion',
    },
  ];

  displayedColumns = [
    'ID',
    'CI',
    'ID_CAT_TIPO_DE_BIEN',
    'CARACTERISTICAS',
    'FOLIO_INVENTARIO_BIEN',
    'FECHA_FOLIO_INVENTARIO_BIEN',
    'FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO',
    'UBICACION_DONDE_SE_ENCONTRO_EL_BIEN',
  ];

  exampleDatabase!: BienesDisposicionService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<BienesDisposicion>(true, []);
  id?: number;
  bienesDisposicion?: BienesDisposicion;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public bienesDisposicionService: BienesDisposicionService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    console.log('hola desde Bienes a Disposicion');
    this.loadData();
  }

  refresh() {
    console.log('vamos a recargar los datos');
    this.loadData();
  }

  addNew() {
    console.log('vamos a agregar un nuevo registro');
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        bienesDisposicion: this.bienesDisposicion,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.bienesDisposicionService.getDialogData()
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

  editCall(row: BienesDisposicion) {
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        bienesDisposicion: row,
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
          this.bienesDisposicionService.getDialogData();

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

  deleteItem() {}

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

  public loadData() {
    this.exampleDatabase = new BienesDisposicionService(this.httpClient);
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

  exportExcel() {
    console.log('exportar a excel');
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'ID': x.ID,
        'CI': x.CI,
        'TIPO DE BIEN': x.ID_CAT_TIPO_DE_BIEN	,
        'CARACTERISTICAS': x.CARACTERISTICAS,
        'FOLIO INVENTARIO BIEN': x.FOLIO_INVENTARIO_BIEN,
        'FECHA FOLIO INVENTARIO BIEN': moment(x.FECHA_FOLIO_INVENTARIO_BIEN).format("YYYY-MM-DD"),
        'FECHA DE ENTREGA A AMPF DEL INVENTARIO': moment(x.FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO).format("YYYY-MM-DD"),
        'UBICACION DONDE SE ENCONTRO EL BIEN': x.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN,
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

export class ExampleDataSource extends DataSource<BienesDisposicion> {
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: BienesDisposicion[] = [];
  renderedData: BienesDisposicion[] = [];

  constructor(
    public exampleDataBase: BienesDisposicionService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<BienesDisposicion[]> {
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page,
    ];

    this.exampleDataBase.getAllBienesDisposicion();
    return merge(...displayDataChanges).pipe(
      map(() => {
        //filter data
        this.filteredData = this.exampleDataBase.data
          .slice()
          .filter((bienesDisposicion: BienesDisposicion) => {
            const serchStr = (
              bienesDisposicion.ID +
              bienesDisposicion.ID_CI +
              bienesDisposicion.CI +
              bienesDisposicion.ID_CAT_TIPO_DE_BIEN	 +
              bienesDisposicion.CARACTERISTICAS +
              bienesDisposicion.FOLIO_INVENTARIO_BIEN +
              bienesDisposicion.FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO +
              bienesDisposicion.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN
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

  sortData(data: BienesDisposicion[]): BienesDisposicion[] {
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

        case 'ID_CI':
          [propertyA, propertyB] = [a.ID_CI, b.ID_CI];
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
