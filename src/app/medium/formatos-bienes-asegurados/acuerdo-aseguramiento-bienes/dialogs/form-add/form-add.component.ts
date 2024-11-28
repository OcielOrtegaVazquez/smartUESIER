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
import { AcuerdoDeAseguramiento, CatTipoBien, CatFiscalia, CatAMPF, CatCargo, CatSituacionJuridica, CatLugarEntrega } from '../../acuerdo-aseguramiento-bienes.model';
import { AcuerdoAseguramientoBienesComponent } from '../../acuerdo-aseguramiento-bienes.component';
import { AcuerdoAseguramientoBienesService } from '../../acuerdo-aseguramiento-bienes.service';

export interface DialogData{
  ID: number;
  action: string;
  acuerdoDeAseguramiento: AcuerdoDeAseguramiento;
}

export interface AcuerdoDeAseguramientoForm{
  ID_CI:number;
  FECHA_CI: Date;
  ID_CAT_FISCALIA: number;
  ID_CAT_EMPLEADO: number;
  ID_CAT_ROL: number;
  FECHA_ACUERDO_ASEGURAMIENTO: Date;
  ID_CAT_SITUACION_JURIDICA: number;
  ID_CAT_LUGAR_ENTREGA: number;
  DIRECCION_LUGAR_ENTREGA: string;
  FOLIO_NOTIFICACION_URM_DF: string;
  FECHA_NOTIFICACION_REGISTRO: Date;
  NUMERO_REGISTRO_EN_JN: number;
  OBSERVACIONES: string;
  FECHA_REGSITRO_DE_ACUERDO_ASEGURAMIENTO: Date;
  ID_CAT_TIPO_DE_BIEN: number;
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
        AcuerdoAseguramientoBienesComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  acuerdoDeAseguramiento: AcuerdoDeAseguramiento;

  formValue!: FormGroup;
  post: AcuerdoDeAseguramiento[] = [];

  TIPO_BIEN?: CatTipoBien[] = [];
  selectedTipoBien = '';

  FISCALIA?: CatFiscalia[] = [];
  selectedFiscalia = '';

  AMPFS?: CatAMPF[] = [];
  selectedAMPF = '';

  CARGOS?: CatCargo [] = [];
  selectedCargo = '';

  SITUACION?: CatSituacionJuridica[] = [];
  selectedSituacion = '';

  ENTREGA?: CatLugarEntrega[] = [];
  selectedLugar = '';

  constructor (public dialogRef: MatDialogRef<FormAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public acuerdoDeAseguramientoService: AcuerdoAseguramientoBienesService,
              public fb: UntypedFormBuilder,
              private formBuilder: FormBuilder,
              public httpClient: HttpClient
              
  ){
    this.action = data.action;
    if(this.action === 'edit'){
      this.dialogTitle = data.acuerdoDeAseguramiento.CI;
      this.acuerdoDeAseguramiento = data.acuerdoDeAseguramiento;
    }else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as AcuerdoDeAseguramiento;
      this.acuerdoDeAseguramiento = new AcuerdoDeAseguramiento(blankObjetc);
    }

    this.proForm = this.createAcuerdoDeAseguramientoForm();
    this.getCatTipoBien();
    this.getCatFiscalia();
    this.getCatAMPF();
    this.getCatCargo();
    this.getCatSituacionJuridica();
    this.getCatLugarEntrega();

  }

  formControl = new UntypedFormControl('', []);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'not valid email'
        : '';
  }

  getCatTipoBien(){
    this.acuerdoDeAseguramientoService.getAllTipoBien().then(catTipoBien => {
      this.TIPO_BIEN = catTipoBien;
      console.log(catTipoBien);
    });
  }

  getCatFiscalia(){
    this.acuerdoDeAseguramientoService.getAllFiscalias().then(catFiscalias => {
      this.FISCALIA = catFiscalias;
      console.log(catFiscalias);
    });
  }

  getCatAMPF(){
    this.acuerdoDeAseguramientoService.getAllAMPF().then(catAMPF => {
      this.AMPFS = catAMPF;
      console.log(catAMPF);
    });
  }

  getCatCargo(){
    this.acuerdoDeAseguramientoService.getAllCargo().then(catCargo => {
      this.CARGOS = catCargo;
      console.log(catCargo);
    });
  }

  getCatSituacionJuridica(){
    this.acuerdoDeAseguramientoService.getAllSituacionJuridica().then(catSituacionJuridica =>{
      this.SITUACION = catSituacionJuridica;
      console.log(catSituacionJuridica);
    });
  }

  getCatLugarEntrega(){
    this.acuerdoDeAseguramientoService.getAllLugarEntrega().then(catLugarEntrega =>{
      this.ENTREGA = catLugarEntrega;
      console.log(catLugarEntrega);
    });
  }

  createAcuerdoDeAseguramientoForm(): UntypedFormGroup{
    return this.fb.group({
      ID: [this.acuerdoDeAseguramiento.ID],
      CI: [this.acuerdoDeAseguramiento.CI],
      ID_CI: [this.acuerdoDeAseguramiento.ID_CI],
      FECHA_CI: [this.acuerdoDeAseguramiento.FECHA_CI],
      ID_CAT_TIPO_DE_BIEN: [this.acuerdoDeAseguramiento.ID_CAT_TIPO_DE_BIEN],
      ID_CAT_FISCALIA: [this.acuerdoDeAseguramiento.ID_CAT_FISCALIA],
      ID_CAT_EMPLEADO: [this.acuerdoDeAseguramiento.ID_CAT_EMPLEADO],
      ID_CAT_ROL: [this.acuerdoDeAseguramiento.ID_CAT_ROL],
      FECHA_ACUERDO_ASEGURAMIENTO: [this.acuerdoDeAseguramiento.FECHA_ACUERDO_ASEGURAMIENTO],
      ID_CAT_SITUACION_JURIDICA: [this.acuerdoDeAseguramiento.ID_CAT_SITUACION_JURIDICA],
      ID_CAT_LUGAR_ENTREGA: [this.acuerdoDeAseguramiento.ID_CAT_LUGAR_ENTREGA],
      DIRECCION_LUGAR_ENTREGA: [this.acuerdoDeAseguramiento.DIRECCION_LUGAR_ENTREGA],
      FOLIO_NOTIFICACION_URM_DF: [this.acuerdoDeAseguramiento.FOLIO_NOTIFICACION_URM_DF],
      FECHA_NOTIFICACION_REGISTRO: [this.acuerdoDeAseguramiento.FECHA_NOTIFICACION_REGISTRO],
      NUMERO_REGISTRO_EN_JN: [this.acuerdoDeAseguramiento.NUMERO_REGISTRO_EN_JN],
      OBSERVACIONES: [this.acuerdoDeAseguramiento.OBSERVACIONES],
      FECHA_REGISTRO_DE_ACUERDO_ASEGURAMIENTO: [this.acuerdoDeAseguramiento.FECHA_REGISTRO_DE_ACUERDO_ASEGURAMIENTO]
    });
  }

  submit(){
    const { value } = this.proForm;
    const postObject = {
      ID: value.ID,
      CI: value.CI,
      ID_CI: value.ID_CI,
      FECHA_CI: value.FECHA_CI,
      ID_CAT_TIPO_DE_BIEN: value.ID_CAT_TIPO_DE_BIEN,
      ID_CAT_FISCALIA: value.ID_CAT_FISCALIA,
      ID_CAT_EMPLEADO: value.ID_CAT_EMPLEADO,
      ID_CAT_ROL: value.ID_CAT_ROL,
      FECHA_ACUERDO_ASEGURAMIENTO: value.FECHA_ACUERDO_ASEGURAMIENTO,
      ID_CAT_SITUACION_JURIDICA: value.ID_CAT_SITUACION_JURIDICA,
      ID_CAT_LUGAR_ENTREGA: value.ID_CAT_LUGAR_ENTREGA,
      DIRECCION_LUGAR_ENTREGA: value.DIRECCION_LUGAR_ENTREGA,
      FOLIO_NOTIFICACION_URM_DF: value.FOLIO_NOTIFICACION_URM_DF,
      FECHA_NOTIFICACION_REGISTRO: value.FECHA_NOTIFICACION_REGISTRO,
      NUMERO_REGISTRO_EN_JN: value.NUMERO_REGISTRO_EN_JN,
      OBSERVACIONES: value.OBSERVACIONES,
      FECHA_REGISTRO_DE_ACUERDO_ASEGURAMIENTO: value.FECHA_REGISTRO_DE_ACUERDO_ASEGURAMIENTO,
      
    }
    console.log(postObject);

    if (postObject.FOLIO_NOTIFICACION_URM_DF === null){
      console.log("Es nuevo");
    this.acuerdoDeAseguramientoService.addAcuerdoDeAseguramiento(postObject).subscribe((res) => {
      console.log(res);
      this.post.push(postObject);
      console.log(postObject);
    });
    
  } else {
    console.log("vamos a editar");
    this.acuerdoDeAseguramientoService.editAcuerdoDeAseguramiento(postObject).subscribe((res) => {
      console.log(res);
      this.post.push(postObject);
    });
  }
}

  onNoClick() {
    this.dialogRef.close();
  }

  public confirmAdd(): void{
    this.acuerdoDeAseguramientoService.addAcuerdoDeAseguramiento(this.proForm.getRawValue());
  }

}
