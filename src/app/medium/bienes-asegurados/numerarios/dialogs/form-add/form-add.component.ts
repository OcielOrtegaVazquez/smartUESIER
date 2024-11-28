import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { NumerariosService } from '../../numerarios.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Numerario } from '../../numerario.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NumerariosComponent } from '../../numerarios.component';

export interface DialogData {
  ID: number;
  action: string;
  numerario: Numerario;
}

export interface NumerarioForm {
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
        NumerariosComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  numerario: Numerario;

  formValue!: FormGroup;
  post: Numerario[] = [];

  constructor(public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public numerariosService: NumerariosService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient){

      this.action = data.action;
    if(this.action === 'edit'){
      this.dialogTitle = data.numerario.CI;
      this.numerario = data.numerario;
    }else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as Numerario;
      this.numerario = new Numerario(blankObjetc);
    }
    this.proForm = this.createNumerarioForm();
  }

  formControl = new UntypedFormControl('', []);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'not valid email'
        : '';
  }

  createNumerarioForm(): UntypedFormGroup{
    return this.fb.group({
      SEDE_SUBSEDE: [this.numerario.SEDE_SUBSEDE],
      CI: [this.numerario.CI],
      FECHA_CI: [this.numerario.FECHA_CI],
      DELITO: [this.numerario.DELITO],
      FECHA_ASEGURAMIENTO: [this.numerario.FECHA_ASEGURAMIENTO],
      MOTIVO_ASEGURAMIENTO: [this.numerario.MOTIVO_ASEGURAMIENTO],
      EFECTIVO_CTA_BANCARIA: [this.numerario.EFECTIVO_CTA_BANCARIA],
      TIPO_MONEDA: [this.numerario.TIPO_MONEDA],
      IMPORTE: [this.numerario.IMPORTE],
      ESTADO_CONSERVACION: [this.numerario.ESTADO_CONSERVACION],
      AUT_APO: [this.numerario.AUT_APO],
      CUENTA_BANCARIA_ASEG: [this.numerario.CUENTA_BANCARIA_ASEG],
      TITULAR_CTA_ASEG: [this.numerario.TITULAR_CTA_ASEG],
      INSTITUCION_CTA_ASEG: [this.numerario.INSTITUCION_CTA_ASEG],
      OBSERVACIONES: [this.numerario.OBSERVACIONES]
    })
   }

   submit(){
    const { value } = this.proForm;

    const postObj: Numerario =  {
      ID: value[''],
      SEDE_SUBSEDE: value.SEDE_SUBSEDE,
      CI: value.CI,
      FECHA_CI: value.FECHA_CI,
      DELITO: value.DELITO,
      FECHA_ASEGURAMIENTO: value.FECHA_ASEGURAMIENTO,
      MOTIVO_ASEGURAMIENTO: value.MOTIVO_ASEGURAMIENTO,
      EFECTIVO_CTA_BANCARIA: value.EFECTIVO_CTA_BANCARIA,
      TIPO_MONEDA: value.TIPO_MONEDA,
      IMPORTE: value.IMPORTE,
      ESTADO_CONSERVACION: value.ESTADO_CONSERVACION,
      AUT_APO: value.AUT_APO,
      CUENTA_BANCARIA_ASEG: value.CUENTA_BANCARIA_ASEG,
      TITULAR_CTA_ASEG: value.TITULAR_CTA_ASEG,
      INSTITUCION_CTA_ASEG: value.INSTITUCION_CTA_ASEG,
      OBSERVACIONES: value.OBSERVACIONES,
    }

    console.log(postObj);

    this.numerariosService.addNumerario(postObj).subscribe((res) => {
      console.log(res);
      this.post.push(postObj);
    })
   }

   onNoClick() {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.numerariosService.addNumerario(this.proForm.getRawValue());
  }


}
