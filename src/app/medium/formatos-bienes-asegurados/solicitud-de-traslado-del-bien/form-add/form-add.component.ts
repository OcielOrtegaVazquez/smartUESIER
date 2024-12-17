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
import { SolicitudDeTrasladoDelBien, CatFiscalia, CatFiscaliaFederal, CatAMPF, CatCargo, CatTipoBien, CatLugarEntrega } from '../solicitud-de-traslado-del-bien.model';
import { SolicitudDeTrasladoDelBienComponent } from '../solicitud-de-traslado-del-bien.component';
import { SolicitudDeTrasladoDelBienService } from '../solicitud-de-traslado-del-bien.service';

export interface DialogData{
  ID: number;
  action: string;
  solicitudDeTrasladoDelBien: SolicitudDeTrasladoDelBien;
}

export interface EntregaDeMuestrasForm{
  ID: number;
  CI: string;
  ID_CI: string;
  FECHA_CI: Date;
  NUMERO_REGISTRO_EN_JN: string;
  ID_CAT_FISCALIA: number;
  ID_CAT_FISCALIA_FEDERAL: number;
  ID_CAT_EMPLEADO: number;
  ID_CAT_ROL: number;
  FOLIO_SOLICITUD_TRASLADO: string;
  OFICIO_SOLICITUD_TRASLADO: string;
  FECHA_SOLICITUD_TRASLADO: Date;
  FECHA_PROGRAMADA_TRASLADO: Date;
  ID_CAT_TIPO_DE_BIEN: number;
  CARACTERISTICAS: string;
  ID_CAT_UBICACION_RESGUARDO: number;
  ID_CAT_LUGAR_ENTREGA: number;
  OBSERVACIONES: string;
  FECHA_REGISTRO_SOLICITUD_TRASLADO: Date;
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
        SolicitudDeTrasladoDelBienComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})

export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  solicitudDeTrasladoDelBien: SolicitudDeTrasladoDelBien;

  formValue!: FormGroup;
  post: SolicitudDeTrasladoDelBien[] = [];

  FISCALIA?: CatFiscalia[] = [];
  selectedFiscalia = '';

  FISCALIA_FEDERAL?: CatFiscaliaFederal[] = [];
  selectedFiscaliaFederal = '';

  AMPFS?: CatAMPF[] = [];
  selectedAMPF = '';

  CARGOS?: CatCargo[] = [];
  selectedCargo = '';

  TIPO_BIEN?: CatTipoBien[] = [];
  selectedTipoBien = '';

  ENTREGA?: CatLugarEntrega[] = [];
  selectedLugar = '';


  constructor (public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public solicitudDeTrasladoDelBienService: SolicitudDeTrasladoDelBienService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient

  ){
  this.action = data.action;
    if(this.action === 'edit'){
      this.dialogTitle = data.solicitudDeTrasladoDelBien.CI;
      this.solicitudDeTrasladoDelBien = data.solicitudDeTrasladoDelBien;
    }else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as SolicitudDeTrasladoDelBien;
      this.solicitudDeTrasladoDelBien = new SolicitudDeTrasladoDelBien(blankObjetc);
    }

    this.proForm = this.createSolicitudDeTrasladoDelBienForm();
    this.getCatFiscalia();
    this.getCatFiscaliaFederal();
    this.getCatAMPF();
    this.getCatCargo();
    this.getCatTipoBien();
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
  
  getCatFiscalia(){
    this.solicitudDeTrasladoDelBienService.getAllFiscalias().then(catFiscalias => {
      this.FISCALIA = catFiscalias;
      console.log(catFiscalias);
    });
  }

  getCatFiscaliaFederal(){
    this.solicitudDeTrasladoDelBienService.getAllFiscaliasFederales().then(catFiscaliaFederal => {
      this.FISCALIA_FEDERAL = catFiscaliaFederal;
      console.log(catFiscaliaFederal);
    });
  }

  getCatAMPF(){
    this.solicitudDeTrasladoDelBienService.getAllAMPF().then(catAMPF => {
      this.AMPFS = catAMPF;
      console.log(catAMPF);
    });
  }

  getCatCargo(){
    this.solicitudDeTrasladoDelBienService.getAllCargo().then(catCargo => {
      this.CARGOS = catCargo;
      console.log(catCargo);
    });
  }

  getCatTipoBien(){
    this.solicitudDeTrasladoDelBienService.getAllTipoBien().then(catTipoBien => {
      this.TIPO_BIEN = catTipoBien;
      console.log(catTipoBien);
    });
  }

  getCatLugarEntrega(){
    this.solicitudDeTrasladoDelBienService.getAllLugarEntrega().then(catLugarEntrega =>{
      this.ENTREGA = catLugarEntrega;
      console.log(catLugarEntrega);
    });
  }

  createSolicitudDeTrasladoDelBienForm(): UntypedFormGroup{
    return this.fb.group({
      ID: [this.solicitudDeTrasladoDelBien.ID],
      CI: [this.solicitudDeTrasladoDelBien.CI],
      ID_CI: [this.solicitudDeTrasladoDelBien.ID_CI],
      FECHA_CI: [this.solicitudDeTrasladoDelBien.FECHA_CI],
      NUMERO_REGISTRO_EN_JN: [this.solicitudDeTrasladoDelBien.NUMERO_REGISTRO_EN_JN],
      ID_CAT_FISCALIA: [this.solicitudDeTrasladoDelBien.ID_CAT_FISCALIA],
      ID_CAT_FISCALIA_FEDERAL: [this.solicitudDeTrasladoDelBien.ID_CAT_FISCALIA_FEDERAL],
      ID_CAT_EMPLEADO: [this.solicitudDeTrasladoDelBien.ID_CAT_EMPLEADO],
      ID_CAT_ROL: [this.solicitudDeTrasladoDelBien.ID_CAT_ROL],
      FOLIO_SOLICITUD_TRASLADO: [this.solicitudDeTrasladoDelBien.FOLIO_SOLICITUD_TRASLADO],
      OFICIO_SOLICITUD_TRASLADO: [this.solicitudDeTrasladoDelBien.OFICIO_SOLICITUD_TRASLADO],
      FECHA_SOLICITUD_TRASLADO: [this.solicitudDeTrasladoDelBien.FECHA_SOLICITUD_TRASLADO],
      FECHA_PROGRAMADA_TRASLADO: [this.solicitudDeTrasladoDelBien.FECHA_PROGRAMADA_TRASLADO],
      ID_CAT_TIPO_DE_BIEN: [this.solicitudDeTrasladoDelBien.ID_CAT_TIPO_DE_BIEN],
      CARACTERISTICAS: [this.solicitudDeTrasladoDelBien.CARACTERISTICAS],
      ID_CAT_UBICACION_RESGUARDO: [this.solicitudDeTrasladoDelBien.ID_CAT_UBICACION_RESGUARDO],
      ID_CAT_LUGAR_ENTREGA: [this.solicitudDeTrasladoDelBien.ID_CAT_LUGAR_ENTREGA],
      OBSERVACIONES: [this.solicitudDeTrasladoDelBien.OBSERVACIONES],
      FECHA_REGISTRO_SOLICITUD_TRASLADO: [this.solicitudDeTrasladoDelBien.FECHA_REGISTRO_SOLICITUD_TRASLADO]
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
      ID_CAT_EMPLEADO: value.ID_CAT_EMPLEADO,
      ID_CAT_ROL: value.ID_CAT_ROL,
      FOLIO_SOLICITUD_TRASLADO: value.FOLIO_SOLICITUD_TRASLADO,
      OFICIO_SOLICITUD_TRASLADO: value.OFICIO_SOLICITUD_TRASLADO,
      FECHA_SOLICITUD_TRASLADO: value.FECHA_SOLICITUD_TRASLADO,
      FECHA_PROGRAMADA_TRASLADO: value.FECHA_PROGRAMADA_TRASLADO,
      ID_CAT_TIPO_DE_BIEN: value.ID_CAT_TIPO_DE_BIEN,
      CARACTERISTICAS: value.CARACTERISTICAS,
      ID_CAT_UBICACION_RESGUARDO: value.ID_CAT_UBICACION_RESGUARDO,
      ID_CAT_LUGAR_ENTREGA: value.ID_CAT_LUGAR_ENTREGA,
      OBSERVACIONES: value.OBSERVACIONES,
      FECHA_REGISTRO_SOLICITUD_TRASLADO: value.FECHA_REGISTRO_SOLICITUD_TRASLADO,

    }
    console.log(postObject);

    if (postObject.FOLIO_SOLICITUD_TRASLADO === null){
      console.log('Es nuevo');
    this.solicitudDeTrasladoDelBienService.addSolicitudTraslado(postObject).subscribe((res) => {
      console.log(res);
      this.post.push(postObject);
      console.log(postObject);
    });
    } else {
      console.log('Vamos a editar');
      this.solicitudDeTrasladoDelBienService.editSolicitudTraslado(postObject).subscribe((res) => {
        console.log(res);
        this.post.push(postObject)
      });
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  public confirmAdd(): void{
    this.solicitudDeTrasladoDelBienService.addSolicitudTraslado(this.proForm.getRawValue());
  }

}