import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { BienesDisposicionService } from '../../bienes-a-disposicion.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BienesDisposicion, CatTipoBien } from '../../bienes-a-disposicion.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BienesADisposicionComponent } from '../../bienes-a-disposicion.component';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe} from '@angular/common';

export interface DialogData{
  ID: number;
  action: string;
  bienesDisposicion: BienesDisposicion;
}

export interface BienDisposicionForm {
  ACT: number;
  ID_CI: number;
  ID_CAT_TIPO_DE_BIEN: number;
  CARACTERISTICAS: string;
  FOLIO_INVENTARIO_BIEN: string;
  FECHA_FOLIO_INVENTARIO_BIEN: Date;
  FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO: Date;
  UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: string;
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
        BienesADisposicionComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  bienesDisposicion: BienesDisposicion;

  formValue!: FormGroup;
  post: BienesDisposicion[]= [];

  TIPO_BIEN?: CatTipoBien[] = [];
  selectedTipoBien = '';

  constructor (public dialogRef: MatDialogRef<FormAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public bienDisposicionservice: BienesDisposicionService,
              public fb: UntypedFormBuilder,
              private formBuilder: FormBuilder,
              public httpClient: HttpClient
  ){

    this.action = data.action;
      if(this.action === 'edit'){
        this.dialogTitle = data.bienesDisposicion.CI;
        this.bienesDisposicion = data.bienesDisposicion;
      }else {
        this.dialogTitle = 'Nuevo Registro';
        const blankObjetc = {} as BienesDisposicion;
        this.bienesDisposicion = new BienesDisposicion(blankObjetc);
      }
      this.proForm = this.createBienDisposicionForm();
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

  getCatTipoBien(){
    this.bienDisposicionservice.getAllTipoBien().then(catTipoBien => {
      this.TIPO_BIEN = catTipoBien;
      console.log(catTipoBien);
    }); 
  }
  

  createBienDisposicionForm(): UntypedFormGroup{
    return this.fb.group({
      ID: [this.bienesDisposicion.ID],
      ID_CI: [this.bienesDisposicion.ID_CI],
      CI: [this.bienesDisposicion.CI],
      ID_CAT_TIPO_DE_BIEN	: [this.bienesDisposicion.ID_CAT_TIPO_DE_BIEN	],
      CARACTERISTICAS: [this.bienesDisposicion.CARACTERISTICAS],
      FOLIO_INVENTARIO_BIEN: [this.bienesDisposicion.FOLIO_INVENTARIO_BIEN],
      FECHA_FOLIO_INVENTARIO_BIEN: [this.bienesDisposicion.FECHA_FOLIO_INVENTARIO_BIEN],
      FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO: [this.bienesDisposicion.FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO],
      UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: [this.bienesDisposicion.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN]
    });
  }

  submit(){
    const { value } = this.proForm;
    const postObjet = {
      ID: value.ID,
      ID_CI: value.ID_CI,
      CI: value.CI,
      ID_CAT_TIPO_DE_BIEN	: value.ID_CAT_TIPO_DE_BIEN,
      CARACTERISTICAS: value.CARACTERISTICAS,
      FOLIO_INVENTARIO_BIEN: value.FOLIO_INVENTARIO_BIEN,
      FECHA_FOLIO_INVENTARIO_BIEN: value.FECHA_FOLIO_INVENTARIO_BIEN,
      FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO: value.FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO,
      UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: value.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN
    }
    
      console.log(postObjet);

    if (postObjet.CARACTERISTICAS === null){
           console.log("Es nuevo");
      this.bienDisposicionservice.addBienAsegurado(postObjet).subscribe((res) => {
      console.log(res);
      this.post.push(postObjet);
      console.log(postObjet); 
     });
    }else{

       
         console.log("Vamos a editar");
      this.bienDisposicionservice.editBienAsegurado(postObjet).subscribe((res) => {
        console.log(res);
        this.post.push(postObjet); 
      });
    
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  public confirmAdd(): void{
    this.bienDisposicionservice.addBienAsegurado(this.proForm.getRawValue());
  }

}
