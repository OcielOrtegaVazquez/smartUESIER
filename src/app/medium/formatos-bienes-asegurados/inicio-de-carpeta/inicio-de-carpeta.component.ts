import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InicioDeCarpeta } from './inicio-de-carpet.model';
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
import { InicioDeCarpetaService } from './inicio-de-carpeta.service';
import { FormAddComponent } from './dialogs/form-add/form-add.component';

export interface CatAMPF {
  ID: number,
  NOMBRE2: string
}

@Component({
  selector: 'app-inicio-de-carpeta',
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
  templateUrl: './inicio-de-carpeta.component.html',
  styleUrl: './inicio-de-carpeta.component.scss'
})
export class InicioDeCarpetaComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  breadscrums = [
    {
      title: 'Inicio de Carpeta',
      items: [],
      active: 'Inicio de Carpeta',
    },
  ];

    displayedColumns = [
    'ID',
    'CI',
    'FECHA_CI',
    'ID_CAT_TIPO_DELITO',
    'ID_CAT_CAUSA_APERTURA_CI',
    'FISCALIA_ESPECIALIZADA',
    'FISCALIA_FEDERAL',
    'TIPO_DE_BIEN',
    'CARACTERISTICAS',
    'FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO',
    'UBICACION_DONDE_SE_ENCONTRO_EL_BIEN',
    'OBSERVACIONES',
    'FECHA_REGISTRO'
  ];

  exampleDatabase!: InicioDeCarpetaService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<InicioDeCarpeta>(true, []);
  id?: number;
  inicioDeCarpeta?: InicioDeCarpeta;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public inicioDeCarpetaService: InicioDeCarpetaService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    console.log("Hola desde el formato 01");
    this.loadData();

  }

  refresh() {
    console.log("vamos a recargar los datos");
    this.loadData();
  }

  addNew() {
    console.log("vamos a agregar un nuevo registro");
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        inicioDeCarpeta: this.inicioDeCarpeta,
        action: 'add'
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(
          this.inicioDeCarpetaService.getDialogData()
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

  editCall(row: InicioDeCarpeta) {
    this.id = row.ID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') == 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr'
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      data: {
        inicioDeCarpeta: row,
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
          this.inicioDeCarpetaService.getDialogData();

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

  deleteItem() {

  }

  privateRefreshTable() {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle() {

  }

  removeSelectedRows() {
    console.log("eliminar seleccionados");
  }

  public loadData() {
    this.exampleDatabase = new InicioDeCarpetaService(this.httpClient);
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
    )

  }

  exportExcel() {
    console.log("exportar a excel");
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'ID': x.ID,
        'CI': x.CI,
        'FECHA_CI': moment(x.FECHA_CI).format("YYYY-MM-DD"),
        'NOMBRE AMPF INICIO CI': x.ID_CAT_EMPLEADO,
        'CARGO AMPF INICIO CI': x.ID_CAT_ROL,
        'TIPO DELITO': x.ID_CAT_TIPO_DELITO,
        'CAUSA APERTURA CI': x.ID_CAT_CAUSA_APERTURA_CI,
        'FISCALIA ESPECIALIZADA': x.ID_CAT_FISCALIA,
        'FISCALIA FEDERAL': x.ID_CAT_FISCALIA_FEDERAL,
        'FISCALIA ESPECIAL': x.ID_CAT_FISCALIA_ESPECIAL,
        'UNIDAD': x.ID_CAT_UNIDAD,
        'TIPO DE BIEN': x.ID_CAT_TIPO_DE_BIEN,
        'CARACTERISTICAS': x.CARACTERISTICAS,
        'FOLIO INVENTARIO BIEN': x.FOLIO_INVENTARIO_BIEN,
        'FECHA FOLIO INVENTARIO BIEN': moment(x.FECHA_FOLIO_INVENTARIO).format("YYYY-MM-DD"),
        'FECHA DE ENTREGA A AMPF DEL INVENTARIO': moment(x.FECHA_DE_ENTREGA_A_AMPF_DE_INV).format("YYYY-MM-DD"),
        'OBSERVACIONES': x.OBSERVACIONES,
        'FECHA REGISTRO': moment(x.FECHA_REGISTRO).format("YYYY-MM-DD"),
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  showNotificacion(colorName: string,
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

export class ExampleDataSource extends DataSource<InicioDeCarpeta> {
  filterchange = new BehaviorSubject('');
  get filter(): string {
    return this.filterchange.value;
  }

  set filter(filter: string) {
    this.filterchange.next(filter);
  }

  filteredData: InicioDeCarpeta[] = [];
  renderedData: InicioDeCarpeta[] = [];

  constructor(public exampleDataBase: InicioDeCarpetaService,
    public paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    this.filterchange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<InicioDeCarpeta[]> {
    const displayDataChanges = [
      this.exampleDataBase.dataChange,
      this._sort.sortChange,
      this.filterchange,
      this.paginator.page
    ];

    this.exampleDataBase.getAllInicioDeCarpeta();
    return merge(...displayDataChanges).pipe(
      map(() => {
        //filter data
        this.filteredData = this.exampleDataBase.data.slice().filter((inicioDeCarpeta: InicioDeCarpeta) => {
          const serchStr = (
            inicioDeCarpeta.ID +
            inicioDeCarpeta.CI +
            inicioDeCarpeta.FECHA_CI +
            inicioDeCarpeta.ID_CAT_EMPLEADO +
            inicioDeCarpeta.ID_CAT_TIPO_DELITO + 
            inicioDeCarpeta.ID_CAT_CAUSA_APERTURA_CI + 
            inicioDeCarpeta.ID_CAT_FISCALIA + 
            inicioDeCarpeta.ID_CAT_FISCALIA_FEDERAL +
            inicioDeCarpeta.ID_CAT_TIPO_DE_BIEN +
            inicioDeCarpeta.CARACTERISTICAS + 
            inicioDeCarpeta.FECHA_DE_ENTREGA_A_AMPF_DE_INV +
            inicioDeCarpeta.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN
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

  disconnect() {

  }


  sortData(data: InicioDeCarpeta[]): InicioDeCarpeta[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data
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

        case 'FECHA_CI':
          [propertyA, propertyB] = [a.FECHA_CI, b.FECHA_CI];
          break;

        /* case 'ID_CAT_EMPLEADO':
          [propertyA, propertyB] = [a.ID_CAT_EMPLEADO, b.ID_CAT_EMPLEADO];
          break; */

          case 'ID_CAT_TIPO_DELITO':
            [propertyA, propertyB] = [a.ID_CAT_TIPO_DELITO,b.ID_CAT_TIPO_DELITO]
            break
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    })
  }
}
