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
import { InmueblesComponent } from '../../inmuebles.component';
import { InmueblesService } from '../../inmuebles.service';
import { Inmueble } from '../../inmueble.model';

export interface DialogData {
  ID: number;
  action: string;
  inmueble: Inmueble;
}

export interface InmuebleForm {
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
    InmueblesComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  inmueble: Inmueble;

  formValue!: FormGroup;
  post: Inmueble[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public inmueblesService: InmueblesService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.inmueble.CI;
      this.inmueble = data.inmueble;
    } else {
      this.dialogTitle = 'Nuevo Registro';
      const blankObjetc = {} as Inmueble;
      this.inmueble = new Inmueble(blankObjetc);
    }
    this.proForm = this.createInmuebleForm();
  }

  formControl = new UntypedFormControl('', []);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'not valid email'
        : '';
  }

  createInmuebleForm(): UntypedFormGroup {
    return this.fb.group({
      SEDE_SUBSEDE: [this.inmueble.SEDE_SUBSEDE],
      CI: [this.inmueble.CI],
      FECHA_CI: [this.inmueble.FECHA_CI],
      DELITO: [this.inmueble.DELITO],
      FECHA_ASEGURAMIENTO: [this.inmueble.FECHA_ASEGURAMIENTO],
      MOTIVO_ASEGURAMIENTO: [this.inmueble.MOTIVO_ASEGURAMIENTO],
      TIPO: [this.inmueble.TIPO],
      CALLE: [this.inmueble.CALLE],
      NUM_EXT: [this.inmueble.NUM_EXT],
      NUM_INT: [this.inmueble.NUM_INT],
      COLONIA: [this.inmueble.COLONIA],
      CODIGO_POSTAL: [this.inmueble.CODIGO_POSTAL],
      MUN_ALC: [this.inmueble.MUN_ALC],
      ENTIDAD_FED: [this.inmueble.ENTIDAD_FED],
      SUPERFICIE_TERR: [this.inmueble.SUPERFICIE_TERR],
      SUPERFICIE_CONST: [this.inmueble.SUPERFICIE_CONST],
      EDO_CONSERVACION: [this.inmueble.EDO_CONSERVACION],
      VALOR_DICTAMEN: [this.inmueble.VALOR_DICTAMEN],
      TIPO_MONEDA: [this.inmueble.TIPO_MONEDA],
      OBSERVACIONES: [this.inmueble.OBSERVACIONES]
    })
  }

  submit(){
    const { value } = this.proForm;

    const postObj: Inmueble = {
      ID: value[''],
      SEDE_SUBSEDE: value.SEDE_SUBSEDE,
      CI: value.CI,
      FECHA_CI: value.FECHA_CI,
      DELITO: value.DELITO,
      FECHA_ASEGURAMIENTO: value.FECHA_ASEGURAMIENTO,
      MOTIVO_ASEGURAMIENTO: value.MOTIVO_ASEGURAMIENTO,
      TIPO: value.TIPO,
      CALLE: value.CALLE,
      NUM_EXT: value.NUM_EXT,
      NUM_INT: value.NUM_INT,
      COLONIA: value.COLONIA,
      CODIGO_POSTAL: value.CODIGO_POSTAL,
      MUN_ALC: value.MUN_ALC,
      ENTIDAD_FED: value.ENTIDAD_FED,
      SUPERFICIE_TERR: value.SUPERFICIE_TERR,
      SUPERFICIE_CONST: value.SUPERFICIE_CONST,
      EDO_CONSERVACION: value.EDO_CONSERVACION,
      VALOR_DICTAMEN: value.VALOR_DICTAMEN,
      TIPO_MONEDA: value.TIPO_MONEDA,
      OBSERVACIONES: value.OBSERVACIONES
    }
    console.log(postObj);

    this.inmueblesService.addInmueble(postObj).subscribe((res) => {
      console.log(res);
      this.post.push(postObj);
    });

  }

  onNoClick() {
    this.dialogRef.close();
  }
  
  public confirmAdd(): void {
    this.inmueblesService.addInmueble(this.proForm.getRawValue());
  }


}
