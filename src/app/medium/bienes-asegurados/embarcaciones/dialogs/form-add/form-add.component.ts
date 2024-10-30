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
import { EmbarcacionesComponent } from '../../embarcaciones.component';
import { EmbarcacionesService } from 'app/medium/bienes-asegurados/embarcaciones.service';
import { Embarcacion } from '../../embarcacion.model';

export interface DialogData {
  ID: number;
  action: string;
  embarcacion: Embarcacion;
}

export interface EmbarcacionForm {
  SEDE_SUBSEDE: string,
  CI: string,
  FECHA_CI: string,
  DELITO: string
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
        EmbarcacionesComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  embarcacion: Embarcacion;

  formValue!: FormGroup;
  post: Embarcacion[] = [];

 constructor(public dialogRef: MatDialogRef<FormAddComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public embarcacionesService: EmbarcacionesService,
  public fb: UntypedFormBuilder,
  private formBuilder: FormBuilder,
  public httpClient: HttpClient){

    this.action = data.action;
    if(this.action === 'edit'){
      this.dialogTitle = data.embarcacion.CI;
      this.embarcacion = data.embarcacion;
    }else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as Embarcacion;
      this.embarcacion = new Embarcacion(blankObjetc);
    }
    this.proForm = this.createEmbarcacionForm();
 }

 formControl = new UntypedFormControl('', []);

 getErrorMessage() {
  return this.formControl.hasError('required')
    ? 'Required field'
    : this.formControl.hasError('email')
      ? 'not valid email'
      : '';
}

 createEmbarcacionForm(): UntypedFormGroup{
  return this.fb.group({
    SEDE_SUBSEDE: [this.embarcacion.SEDE_SUBSEDE],
    CI: [this.embarcacion.CI],
    FECHA_CI: [this.embarcacion.FECHA_CI],
    DELITO: [this.embarcacion.DELITO],
    FECHA_ASEGURAMIENTO: [this.embarcacion.FECHA_ASEGURAMIENTO],
    MOTIVO_ASEGURAMIENTO: [this.embarcacion.MOTIVO_ASEGURAMIENTO],
    TIPO_EMBARCACION: [this.embarcacion.TIPO_EMBARCACION],
    MARCA: [this.embarcacion.MARCA],
    MODELO: [this.embarcacion.MODELO],
    DIMENSIONES: [this.embarcacion.DIMENSIONES],
    COLOR: [this.embarcacion.COLOR],
    NUM_SERIE: [this.embarcacion.NUM_SERIE],
    MATRICULA: [this.embarcacion.MATRICULA],
    MOTOR: [this.embarcacion.MOTOR],
    NOMBRE_EMBARCACION: [this.embarcacion.NOMBRE_EMBARCACION],
    CARACT_ESPECIALES: [this.embarcacion.CARACT_ESPECIALES],
    ESTADO_CONSERVACION: [this.embarcacion.ESTADO_CONSERVACION],
    REPORTE_ROBO: [this.embarcacion.REPORTE_ROBO],
    VALOR_DICTAMEN: [this.embarcacion.VALOR_DICTAMEN],
    TIPO_MONEDA: [this.embarcacion.TIPO_MONEDA],
    UBICACION_ACTUAL: [this.embarcacion.UBICACION_ACTUAL],
    OBSERVACIONES: [this.embarcacion.OBSERVACIONES]
  })
 }

 submit() {
  const { value } = this.proForm;

  const postObj: Embarcacion = {
    ID: value[''],
    SEDE_SUBSEDE: value.SEDE_SUBSEDE,
    CI: value.CI,
    FECHA_CI: value.FECHA_CI,
    DELITO: value.DELITO,
    FECHA_ASEGURAMIENTO: value.FECHA_ASEGURAMIENTO,
    MOTIVO_ASEGURAMIENTO: value.MOTIVO_ASEGURAMIENTO,
    TIPO_EMBARCACION: value.TIPO_EMBARCACION,
    MARCA: value.MARCA,
    MODELO: value.MODELO,
    DIMENSIONES: value.DIMENSIONES,
    COLOR: value.COLOR,
    NUM_SERIE: value.NUM_SERIE,
    MATRICULA: value.MATRICULA,
    MOTOR: value.MOTOR,
    NOMBRE_EMBARCACION: value.NOMBRE_EMBARCACION,
    CARACT_ESPECIALES: value.CARACT_ESPECIALES,
    ESTADO_CONSERVACION: value.ESTADO_CONSERVACION,
    REPORTE_ROBO: value.REPORTE_ROBO,
    VALOR_DICTAMEN: value.VALOR_DICTAMEN,
    TIPO_MONEDA: value.TIPO_MONEDA,
    UBICACION_ACTUAL: value.UBICACION_ACTUAL,
    OBSERVACIONES: value.OBSERVACIONES,
  }

  console.log(postObj);

  this.embarcacionesService.addEmbarcacion(postObj).subscribe((res) => {
    console.log(res);
    this.post.push(postObj);
  });

}

 onNoClick() {
  this.dialogRef.close();
}

public confirmAdd(): void {
  this.embarcacionesService.addEmbarcacion(this.proForm.getRawValue());
}

}
