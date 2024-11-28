import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe} from '@angular/common';
import { EntregaDeMuestras, CatFiscalia, CatFiscaliaFederal, CatTipoObjeto, CatAMPF, CatCargo, CatTipoBien } from '../entrega-de-muestras-al-cfpf.model';
import { EntregaDeMuestrasAlCfpfComponent } from '../entrega-de-muestras-al-cfpf.component';
import { EntregaDeMuestrasAlCfpfService } from '../entrega-de-muestras-al-cfpf.service';

export interface DialogData{
  ID: number;
  action: string;
  entregaDeMuestras: EntregaDeMuestras;
}

export interface EntregaDeMuestrasForm{
  ID_CI: number;
  FECHA_CI: Date;
  NUMERO_REGISTRO_EN_JN: string;
  ID_CAT_FISCALIA: number;
  ID_CAT_FISCALIA_FEDERAL: number;
  ID_CAT_TIPO_OBJETO: number;
  ID_CAT_EMPLEADO_ENTREGA: number;
  ID_CAT_ROL_ENTREGA: number;
  ID_CAT_EMPLEADO_RECIBE: number;
  ID_CAT_ROL_RECIBE: number;
  FECHA_ENTREGA_MUESTRA: Date;
  ID_CAT_TIPO_DE_BIEN: number;
  CARACTERISTICAS: string;
  FOLIO_ENTREGA_RECEPCION: string;
  OFICIO_ENTREGA_RECEPCION: string;
  FECHA_ENTREGA_RECEPCION: Date;
  OBSERVACIONES: string;
  FECHA_REGISTRO_ENTREGA_MUESTRA: Date;
}

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [
    MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatDialogClose,
        NgFor,
        MatAutocompleteModule,
        AsyncPipe,
        EntregaDeMuestrasAlCfpfComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  entregaDeMuestras: EntregaDeMuestras;

  formValue!: FormGroup;
  post: EntregaDeMuestras[] = [];

  FISCALIA?: CatFiscalia[] = [];
  selectedFiscalia = '';

  FISCALIA_FEDERAL?: CatFiscaliaFederal[] = [];
  selectedFiscaliaFederal = '';

  OBJETO?: CatTipoObjeto[] = [];
  selectedObjeto = '';

  AMPFS?: CatAMPF[] = [];
  selectedAMPF = '';

  CARGOS?: CatCargo[] = [];
  selectedCargo = '';

  TIPO_BIEN?: CatTipoBien[] = [];
  selectedTipoBien = '';

  constructor (public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public entregaDeMuestrasAlCfpfService: EntregaDeMuestrasAlCfpfService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient

  ){
  this.action = data.action;
    if(this.action === 'edit'){
      this.dialogTitle = data.entregaDeMuestras.CI;
      this.entregaDeMuestras = data.entregaDeMuestras;
    }else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as EntregaDeMuestras;
      this.entregaDeMuestras = new EntregaDeMuestras(blankObjetc);
    }

    this.proForm = this.createEntregaDeMuestrasForm();
    this.getCatFiscalia();
    this.getCatFiscaliaFederal();
    this.getCatTipoObjeto();
    this.getCatAMPF();
    this.getCatCargo();
    this.getCatTipoBien();
  }

  formControl = new UntypedFormControl('', []);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'not valid email'
        : '';
  }
  
  getCatFiscalia(){
    this.entregaDeMuestrasAlCfpfService.getAllFiscalias().then(catFiscalias => {
      this.FISCALIA = catFiscalias;
      console.log(catFiscalias);
    });
  }

  getCatFiscaliaFederal(){
    this.entregaDeMuestrasAlCfpfService.getAllFiscaliasFederales().then(catFiscaliaFederal => {
      this.FISCALIA_FEDERAL = catFiscaliaFederal;
      console.log(catFiscaliaFederal);
    });
  }

  getCatTipoObjeto(){
    this.entregaDeMuestrasAlCfpfService.getAllTipoObjeto().then(getCatTipoObjeto => {
      this.OBJETO = getCatTipoObjeto;
      console.log(getCatTipoObjeto);
    });
  }

  getCatAMPF(){
    this.entregaDeMuestrasAlCfpfService.getAllAMPF().then(catAMPF => {
      this.AMPFS = catAMPF;
      console.log(catAMPF);
    });
  }

  getCatCargo(){
    this.entregaDeMuestrasAlCfpfService.getAllCargo().then(catCargo => {
      this.CARGOS = catCargo;
      console.log(catCargo);
    });
  }

  getCatTipoBien(){
    this.entregaDeMuestrasAlCfpfService.getAllTipoBien().then(catTipoBien => {
      this.TIPO_BIEN = catTipoBien;
      console.log(catTipoBien);
    });
  }

  createEntregaDeMuestrasForm(): UntypedFormGroup{
    return this.fb.group({
      ID: [this.entregaDeMuestras.ID],
      CI: [this.entregaDeMuestras.CI],
      ID_CI: [this.entregaDeMuestras.ID_CI],
      FECHA_CI: [this.entregaDeMuestras.FECHA_CI],
      NUMERO_REGISTRO_EN_JN: [this.entregaDeMuestras.NUMERO_REGISTRO_EN_JN],
      ID_CAT_FISCALIA: [this.entregaDeMuestras.ID_CAT_FISCALIA],
      ID_CAT_FISCALIA_FEDERAL: [this.entregaDeMuestras.ID_CAT_FISCALIA_FEDERAL],
      ID_CAT_TIPO_OBJETO: [this.entregaDeMuestras.ID_CAT_TIPO_OBJETO],
      ID_CAT_EMPLEADO_ENTREGA: [this.entregaDeMuestras.ID_CAT_EMPLEADO_ENTREGA],
      ID_CAT_ROL_ENTREGA: [this.entregaDeMuestras.ID_CAT_ROL_ENTREGA],
      ID_CAT_EMPLEADO_RECIBE: [this.entregaDeMuestras.ID_CAT_EMPLEADO_RECIBE],
      ID_CAT_ROL_RECIBE: [this.entregaDeMuestras.ID_CAT_ROL_RECIBE],
      FECHA_ENTREGA_MUESTRA: [this.entregaDeMuestras.FECHA_ENTREGA_MUESTRA],
      ID_CAT_TIPO_DE_BIEN: [this.entregaDeMuestras.ID_CAT_TIPO_DE_BIEN],
      CARACTERISTICAS: [this.entregaDeMuestras.CARACTERISTICAS],
      FOLIO_ENTREGA_RECEPCION: [this.entregaDeMuestras.FOLIO_ENTREGA_RECEPCION],
      OFICIO_ENTREGA_RECEPCION: [this.entregaDeMuestras.OFICIO_ENTREGA_RECEPCION],
      FECHA_ENTREGA_RECEPCION: [this.entregaDeMuestras.FECHA_ENTREGA_RECEPCION],
      OBSERVACIONES: [this.entregaDeMuestras.OBSERVACIONES],
      FECHA_REGISTRO_ENTREGA_MUESTRA: [this.entregaDeMuestras.FECHA_REGISTRO_ENTREGA_MUESTRA]
    });
  }

  submit(){
    const { value } = this.proForm;
    const postObject = {
      ID: value.ID,
      CI: value.CI,
      ID_CI: value.ID_CI,
      FECHA_CI: value.FECHA_CI,
      NUMERO_REGISTRO_EN_JN: value.NUMERO_REGISTRO_EN_JN,
      ID_CAT_FISCALIA: value.ID_CAT_FISCALIA,
      ID_CAT_FISCALIA_FEDERAL: value.ID_CAT_FISCALIA_FEDERAL,
      ID_CAT_TIPO_OBJETO: value.ID_CAT_TIPO_OBJETO,
      ID_CAT_EMPLEADO_ENTREGA: value.ID_CAT_EMPLEADO_ENTREGA,
      ID_CAT_ROL_ENTREGA: value.ID_CAT_ROL_ENTREGA,
      ID_CAT_EMPLEADO_RECIBE: value.ID_CAT_EMPLEADO_RECIBE,
      ID_CAT_ROL_RECIBE: value.ID_CAT_ROL_RECIBE,
      FECHA_ENTREGA_MUESTRA: value.FECHA_ENTREGA_MUESTRA,
      ID_CAT_TIPO_DE_BIEN: value.ID_CAT_TIPO_DE_BIEN,
      CARACTERISTICAS: value.CARACTERISTICAS,
      FOLIO_ENTREGA_RECEPCION: value.FOLIO_ENTREGA_RECEPCION,
      OFICIO_ENTREGA_RECEPCION: value.OFICIO_ENTREGA_RECEPCION,
      FECHA_ENTREGA_RECEPCION: value.FECHA_ENTREGA_RECEPCION,
      OBSERVACIONES: value.OBSERVACIONES,
      FECHA_REGISTRO_ENTREGA_MUESTRA: value.FECHA_REGISTRO_ENTREGA_MUESTRA,

    }
    console.log(postObject);

    if (postObject.FOLIO_ENTREGA_RECEPCION === null){
      console.log('Es nuevo');
    this.entregaDeMuestrasAlCfpfService.addEntregaDeMuestras(postObject).subscribe((res) => {
      console.log(res);
      this.post.push(postObject);
      console.log(postObject);
    });
    } else {
      console.log('Vamos a editar');
      this.entregaDeMuestrasAlCfpfService.editEntregaDeMuestras(postObject).subscribe((res) => {
        console.log(res);
        this.post.push(postObject)
      });
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  public confirmAdd(): void{
    this.entregaDeMuestrasAlCfpfService.addEntregaDeMuestras(this.proForm.getRawValue());
  }

}