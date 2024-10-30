import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { BienesAseguradosService } from 'app/medium/bienes-asegurados/bienes-asegurados.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Aeronave } from '../../aeronave.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AeronavesComponent } from "../../aeronaves.component";

export interface DialogData {
  ID: number;
  action: string;
  aeronave: Aeronave;
}

export interface AeronaveForm {
  SEDE_SUBSEDE: string,
  CI: string,
  FECHA_CI: string,
  DELITO: string
}

@Component({
    selector: 'app-form-add',
    standalone: true,
    templateUrl: './form-add.component.html',
    styleUrl: './form-add.component.scss',
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
        AeronavesComponent
    ]
})




export class FormAddComponent {
  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  aeronave: Aeronave;

  formValue!: FormGroup;
  post: Aeronave[] = [];

  @ViewChild(AeronavesComponent, { static: false })
  private aeronavesComponent!: AeronavesComponent;
  
  constructor(public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public bienesAseguradosService: BienesAseguradosService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient) {

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.aeronave.CI;
      this.aeronave = data.aeronave;
    } else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObject = {} as Aeronave;
      this.aeronave = new Aeronave(blankObject);
    }
    this.proForm = this.createAeronaveForm();
  }

  formControl = new UntypedFormControl('', []);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'not valid email'
        : '';
  }

  createAeronaveForm(): UntypedFormGroup {
    return this.fb.group({
      SEDE_SUBSEDE: [this.aeronave.SEDE_SUBSEDE],
      CI: [this.aeronave.CI],
      FECHA_CI: [this.aeronave.FECHA_CI],
      DELITO: [this.aeronave.DELITO],
      MOTIVO_ASEGURAMIENTO: [this.aeronave.MOTIVO_ASEGURAMIENTO],
      FECHA_ASEGURAMIENTO: [this.aeronave.FECHA_ASEGURAMIENTO],
      MARCA: [this.aeronave.MARCA],
      MODELO: [this.aeronave.MODELO],
      ANIO: [this.aeronave.ANIO],
      NUM_SERIE: [this.aeronave.NUM_SERIE],
      MATRICULA: [this.aeronave.MATRICULA],
      COLOR: [this.aeronave.COLOR],
      CARACT_ESPECIALES: [this.aeronave.CARACT_ESPECIALES],
      ESTADO_CONSERVACION: [this.aeronave.ESTADO_CONSERVACION],
      REPORTE_ROBO: [this.aeronave.REPORTE_ROBO],
      VALOR_DICTAMEN: [this.aeronave.VALOR_DICTAMEN],
      TIPO_MONEDA: [this.aeronave.TIPO_MONEDA],
      UBICACION_ACTUAL: [this.aeronave.UBICACION_ACTUAL],
      OBSERVACIONES: [this.aeronave.OBSERVACIONES]
    })
  }

  submit() {
    const { value } = this.proForm;

    const postObj: Aeronave = {
      ID: value[''],
      SEDE_SUBSEDE: value.SEDE_SUBSEDE,
      CI: value.CI,
      FECHA_CI: value.FECHA_CI,
      FECHA_ASEGURAMIENTO: value.FECHA_ASEGURAMIENTO,
      DELITO: value.DELITO,
      MOTIVO_ASEGURAMIENTO: value.MOTIVO_ASEGURAMIENTO,
      MARCA: value.MARCA,
      MODELO: value.MODELO,
      ANIO: value.ANIO,
      NUM_SERIE: value.NUM_SERIE,
      MATRICULA: value.MATRICULA,
      COLOR: value.COLOR,
      CARACT_ESPECIALES: value.CARACT_ESPECIALES,
      ESTADO_CONSERVACION: value.ESTADO_CONSERVACION,
      REPORTE_ROBO: value.REPORTE_ROBO,
      VALOR_DICTAMEN: value.VALOR_DICTAMEN,
      TIPO_MONEDA: value.TIPO_MONEDA,
      UBICACION_ACTUAL: value.UBICACION_ACTUAL,
      OBSERVACIONES: value.OBSERVACIONES
    }

    console.log(postObj);

    this.bienesAseguradosService.addAeronave(postObj).subscribe((res) => {
      console.log(res);
      this.post.push(postObj);
    });

  }


  onNoClick() {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.bienesAseguradosService.addAeronave(this.proForm.getRawValue());
  }





}
