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
import { CatFiscalia, CatFiscaliaFederal, CatAMPF, CatCargo, CatTipoPeritaje, CatTipoBien, SolicitudPeritaje } from '../../solicitud-peritaje.model';
import { SolicitudPeritajeComponent } from '../../solicitud-peritaje.component';
import { SolicitudPeritajeService } from '../../solicitud-peritaje.service';


export interface DialogData{
  ID: number;
  action: string;
  solicitudPeritaje: SolicitudPeritaje;
}

export interface SolicitudPeritajeForm{
  ID_CI: number;
  FECHA_CI: Date;
  NUMERO_REGISTRO_EN_JN: string;
  ID_CAT_FISCALIA: number;
  ID_CAT_FISCALIA_FEDERAL: number;
  ID_CAT_EMPLEADO: number;
  ID_CAT_ROL: number;
  ID_CAT_TIPO_PERITAJE: number;
  FOLIO_SOLICITUD_PERITAJE: string;
  OFICIO_SOLICITUD_PERITAJE: string;
  FECHA_SOLICITUD_PERITAJE: Date;
  ID_CAT_TIPO_DE_BIEN: number;
  CARACTERISTICAS: string;
  OBSERVACIONES: string;
  FECHA_REGISTRO_SOLICITUD_PERITAJE: Date;
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
        SolicitudPeritajeComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  solicitudPeritaje: SolicitudPeritaje;

  formValue!: FormGroup;
  post: SolicitudPeritaje[] = [];

  FISCALIA?: CatFiscalia[] = [];
  selectedFiscalia = '';

  FISCALIA_FEDERAL?: CatFiscaliaFederal[] = [];
  selectedFiscaliaFederal = '';

  AMPFS?: CatAMPF[] = [];
  selectedAMPF = '';

  CARGOS?: CatCargo[] = [];
  selectedCargo = '';

  PERITAJE?: CatTipoPeritaje[] = [];
  selectedTipoPeritaje = '';

  TIPO_BIEN?: CatTipoBien[] = [];
  selectedTipoBien = '';

  constructor (public dialogRef: MatDialogRef<FormAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public solicitudPeritajeService: SolicitudPeritajeService,
              public fb: UntypedFormBuilder,
              private formBuilder: FormBuilder,
              public httpClient: HttpClient
              
  ){
    this.action = data.action;
    if(this.action === 'edit'){
      this.dialogTitle = data.solicitudPeritaje.CI;
      this.solicitudPeritaje = data.solicitudPeritaje;
    }else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as SolicitudPeritaje;
      this.solicitudPeritaje = new SolicitudPeritaje(blankObjetc);
    }

    this.proForm = this.createSolicitudPeritajeForm();
    this.getCatFiscalia();
    this.getCatFiscaliaFederal();
    this.getCatAMPF();
    this.getCatCargo();
    this.getCatTipoPeritaje();
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
    this.solicitudPeritajeService.getAllFiscalias().then(catFiscalias => {
      this.FISCALIA = catFiscalias;
      console.log(catFiscalias);
    });
  }

  getCatFiscaliaFederal(){
    this.solicitudPeritajeService.getAllFiscaliasFederales().then(catFiscaliaFederal => {
      this.FISCALIA_FEDERAL = catFiscaliaFederal;
      console.log(catFiscaliaFederal);
    });
  }

  getCatAMPF(){
    this.solicitudPeritajeService.getAllAMPF().then(catAMPF => {
      this.AMPFS = catAMPF;
      console.log(catAMPF);
    });
  }

  getCatCargo(){
    this.solicitudPeritajeService.getAllCargo().then(catCargo => {
      this.CARGOS = catCargo;
      console.log(catCargo);
    });
  }

  getCatTipoPeritaje(){
    this.solicitudPeritajeService.getAllTipoPeritaje().then(catTipoPeritaje =>{
      this.PERITAJE = catTipoPeritaje;
      console.log(catTipoPeritaje);
    });
  }

  getCatTipoBien(){
    this.solicitudPeritajeService.getAllTipoBien().then(catTipoBien => {
      this.TIPO_BIEN = catTipoBien;
      console.log(catTipoBien);
    });
  }

  createSolicitudPeritajeForm(): UntypedFormGroup{
    return this.fb.group({
      ID: [this.solicitudPeritaje.ID],
      CI: [this.solicitudPeritaje.CI],
      ID_CI: [this.solicitudPeritaje.ID_CI],
      FECHA_CI: [this.solicitudPeritaje.FECHA_CI],
      NUMERO_REGISTRO_EN_JN: [this.solicitudPeritaje.NUMERO_REGISTRO_EN_JN],
      ID_CAT_FISCALIA: [this.solicitudPeritaje.ID_CAT_FISCALIA],
      ID_CAT_FISCALIA_FEDERAL: [this.solicitudPeritaje.ID_CAT_FISCALIA_FEDERAL],
      ID_CAT_EMPLEADO: [this.solicitudPeritaje.ID_CAT_EMPLEADO],
      ID_CAT_ROL: [this.solicitudPeritaje.ID_CAT_ROL],
      ID_CAT_TIPO_PERITAJE: [this.solicitudPeritaje.ID_CAT_TIPO_PERITAJE],
      FOLIO_SOLICITUD_PERITAJE: [this.solicitudPeritaje.FOLIO_SOLICITUD_PERITAJE],
      OFICIO_SOLICITUD_PERITAJE: [this.solicitudPeritaje.OFICIO_SOLICITUD_PERITAJE],
      FECHA_SOLICITUD_PERITAJE: [this.solicitudPeritaje.FECHA_SOLICITUD_PERITAJE],
      ID_CAT_TIPO_DE_BIEN: [this.solicitudPeritaje.ID_CAT_TIPO_DE_BIEN],
      CARACTERISTICAS: [this.solicitudPeritaje.CARACTERISTICAS],
      OBSERVACIONES: [this.solicitudPeritaje.OBSERVACIONES],
      FECHA_REGISTRO_SOLICITUD_PERITAJE: [this.solicitudPeritaje.FECHA_REGISTRO_SOLICITUD_PERITAJE]
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
      ID_CAT_TIPO_PERITAJE: value.ID_CAT_TIPO_PERITAJE,
      FOLIO_SOLICITUD_PERITAJE: value.FOLIO_SOLICITUD_PERITAJE,
      OFICIO_SOLICITUD_PERITAJE: value. OFICIO_SOLICITUD_PERITAJE,
      FECHA_SOLICITUD_PERITAJE: value. FECHA_SOLICITUD_PERITAJE,
      ID_CAT_TIPO_DE_BIEN: value.ID_CAT_TIPO_DE_BIEN,
      CARACTERISTICAS: value.CARACTERISTICAS,
      OBSERVACIONES: value.OBSERVACIONES,
      FECHA_REGISTRO_SOLICITUD_PERITAJE: value.FECHA_REGISTRO_SOLICITUD_PERITAJE,
      
    }
    console.log(postObject);

    if (postObject.OFICIO_SOLICITUD_PERITAJE === null){
      console.log('Es nuevo');
    this.solicitudPeritajeService.addSolicitudDePeritaje(postObject).subscribe((res) => {
      console.log(res);
      this.post.push(postObject);
      console.log(postObject);
    });
    } else {
      console.log('vamos a editar');
      this.solicitudPeritajeService.editSolicitudDePeritaje(postObject).subscribe((res) => {
        console.log(res);
        this.post.push(postObject);
      });
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  public confirmAdd(): void{
    this.solicitudPeritajeService.addSolicitudDePeritaje(this.proForm.getRawValue());
  }

}
