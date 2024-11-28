import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { InicioDeCarpetaService } from '../../inicio-de-carpeta.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatFiscalia, CatFiscaliaEspecial, CatFiscaliaFederal, CatTipoBien, CatUnidad, InicioDeCarpeta } from '../../inicio-de-carpet.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InicioDeCarpetaComponent } from '../../inicio-de-carpeta.component';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe} from '@angular/common';
import { CatAMPF, CatCargo, CatTipoDelito, CatCausaOrigen} from '../../inicio-de-carpet.model';

export interface DialogData {
  ID: number;
  action: string;
  inicioDeCarpeta: InicioDeCarpeta;
}

export interface InicioDeCarpetaForm {
    CI: string;
    FECHA_CI: Date;
    NOMBRE_AMPF_INICIO_CI: string;
    CARGO_AMPF_INICIO_CI: string;
    TIPO_DELITO: string;
    CAUSA_APERTURA_CI: string;
    FISCALIA_ESPECIALIZADA: string;
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
        InicioDeCarpetaComponent,
        NgFor,
        MatAutocompleteModule,
        AsyncPipe
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  inicioDeCarpeta: InicioDeCarpeta;

  formValue!: FormGroup;
  post: InicioDeCarpeta[] = [];

  AMPFS?: CatAMPF[] = [];
  selectedAMPF = '';

  CARGOS?: CatCargo [] = [];
  selectedCargo = '';

  TIPO_DE_DELITOS?: CatTipoDelito[] = [];
  selectedTipoDeDelito = '';

  CAUSA_ORIGEN?: CatCausaOrigen[] = [];
  selectedCausaOrigen = '';

  FISCALIA?: CatFiscalia[] = [];
  selectedFiscalia = '';

  FISCALIA_FEDERAL?: CatFiscaliaFederal[] = [];
  selectedFiscaliaFederal = '';  

  FISCALIA_ESPECIAL?: CatFiscaliaEspecial[] = [];
  selectedFiscaliaEspecial = '';

  UNIDADES?: CatUnidad[] = [];
  selectedUnidad = '';

  TIPO_BIEN?: CatTipoBien[] = [];
  selectedTipoBien = '';

  constructor(public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public inicioDeCarpetaService: InicioDeCarpetaService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient){
      
  
      this.action = data.action;
      if(this.action === 'edit'){
        this.dialogTitle = data.inicioDeCarpeta.CI;
        this.inicioDeCarpeta = data.inicioDeCarpeta;
      }else {
        this.dialogTitle = 'Nuevo Registro';
        const blankObjetc = {} as InicioDeCarpeta;
        this.inicioDeCarpeta = new InicioDeCarpeta(blankObjetc);
      }
      this.proForm = this.createIniciodeCarpetaForm();
      this.getCatAMPF();
      this.getCatCargo();
      this.getCatTipoDelito();
      this.getCausaOrigen();
      this.getCatFiscalia();
      this.getCatFiscaliaFederal();
      this.getCatFiscaliaEspecial();
      this.getCatUnidades();
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

getCatAMPF(){    
  this.inicioDeCarpetaService.getAllAMPF().then(cat => {
    this.AMPFS = cat;
    console.log(cat);
  })
}

getCatCargo(){
  this.inicioDeCarpetaService.getAllCargo().then(catCargo => {
    this.CARGOS = catCargo;
    console.log(catCargo);
  });
}

getCatTipoDelito(){
  this.inicioDeCarpetaService.getAllTipoDelito().then(catTipoDelito => {
    this.TIPO_DE_DELITOS = catTipoDelito;
    console.log(catTipoDelito);
  });
}

getCausaOrigen(){
  this.inicioDeCarpetaService.getAllCausaOrigen().then(catCausaOrigen => {
    this.CAUSA_ORIGEN = catCausaOrigen;
    console.log(catCausaOrigen);
  });
}

getCatFiscalia(){
  this.inicioDeCarpetaService.getAllFiscalias().then(catFiscalias => {
    this.FISCALIA = catFiscalias;
    console.log(catFiscalias);
  }); 
}

getCatFiscaliaFederal(){
  this.inicioDeCarpetaService.getAllFiscaliasFederales().then(catFiscaliasFederales => {
    this.FISCALIA_FEDERAL = catFiscaliasFederales;
    console.log(catFiscaliasFederales);
  }); 
}

getCatFiscaliaEspecial(){
  this.inicioDeCarpetaService.getAllFiscaliasEspeciales().then(catFiscaliasEspeciales => {
    this.FISCALIA_ESPECIAL = catFiscaliasEspeciales;
    console.log(catFiscaliasEspeciales);
  }); 
}

getCatUnidades(){
  this.inicioDeCarpetaService.getAllUnidades().then(catUnidades => {
    this.UNIDADES = catUnidades;
    console.log(catUnidades);
  }); 
}

getCatTipoBien(){
  this.inicioDeCarpetaService.getAllTipoBien().then(catTipoBien => {
    this.TIPO_BIEN = catTipoBien;
    console.log(catTipoBien);
  }); 
}

createIniciodeCarpetaForm(): UntypedFormGroup{
  return this.fb.group({
        ID: [this.inicioDeCarpeta.ID],
        CI: [this.inicioDeCarpeta.CI],
        FECHA_CI: [this.inicioDeCarpeta.FECHA_CI],
        ID_CAT_EMPLEADO: [this.inicioDeCarpeta.ID_CAT_EMPLEADO],
        ID_CAT_ROL: [this.inicioDeCarpeta.ID_CAT_ROL],
        ID_CAT_TIPO_DELITO: [this.inicioDeCarpeta.ID_CAT_TIPO_DELITO],
        ID_CAT_CAUSA_APERTURA_CI: [this.inicioDeCarpeta.ID_CAT_CAUSA_APERTURA_CI],
        ID_CAT_FISCALIA: [this.inicioDeCarpeta.ID_CAT_FISCALIA],
        ID_CAT_FISCALIA_FEDERAL: [this.inicioDeCarpeta.ID_CAT_FISCALIA_FEDERAL],
        ID_CAT_FISCALIA_ESPECIAL: [this.inicioDeCarpeta.ID_CAT_FISCALIA_ESPECIAL],
        ID_CAT_UNIDAD: [this.inicioDeCarpeta.ID_CAT_UNIDAD],
        ID_CAT_TIPO_DE_BIEN: [this.inicioDeCarpeta.ID_CAT_TIPO_DE_BIEN],
        CARACTERISTICAS: [this.inicioDeCarpeta.CARACTERISTICAS],
        FOLIO_INVENTARIO_BIEN: [this.inicioDeCarpeta.FOLIO_INVENTARIO_BIEN],
        FECHA_FOLIO_INVENTARIO: [this.inicioDeCarpeta.FECHA_FOLIO_INVENTARIO],
        FECHA_DE_ENTREGA_A_AMPF_DE_INV: [this.inicioDeCarpeta.FECHA_DE_ENTREGA_A_AMPF_DE_INV],
        UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: [this.inicioDeCarpeta.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN],
        OBSERVACIONES: [this.inicioDeCarpeta.OBSERVACIONES],
        FECHA_REGISTRO: [this.inicioDeCarpeta.FECHA_REGISTRO],
  });
}

submit(){
  const { value } = this.proForm;

  const postObjet: InicioDeCarpeta = {
        ID: value.ID,
        CI: value.CI,
        FECHA_CI: value.FECHA_CI,
        ID_CAT_EMPLEADO: value.ID_CAT_EMPLEADO,
        ID_CAT_ROL: value.ID_CAT_ROL,
        ID_CAT_TIPO_DELITO: value.ID_CAT_TIPO_DELITO,
        ID_CAT_CAUSA_APERTURA_CI: value.ID_CAT_CAUSA_APERTURA_CI,
        ID_CAT_FISCALIA: value.ID_CAT_FISCALIA,
        ID_CAT_FISCALIA_FEDERAL: value.ID_CAT_FISCALIA_FEDERAL,
        ID_CAT_FISCALIA_ESPECIAL: value.ID_CAT_FISCALIA_ESPECIAL,
        ID_CAT_UNIDAD: value.ID_CAT_UNIDAD,
        ID_CAT_TIPO_DE_BIEN: value.ID_CAT_TIPO_DE_BIEN,
        CARACTERISTICAS: value.CARACTERISTICAS,
        FOLIO_INVENTARIO_BIEN: value.FOLIO_INVENTARIO_BIEN,
        FECHA_FOLIO_INVENTARIO: value.FECHA_FOLIO_INVENTARIO,
        FECHA_DE_ENTREGA_A_AMPF_DE_INV: value.FECHA_DE_ENTREGA_A_AMPF_DE_INV,
        UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: value.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN,
        OBSERVACIONES: value.OBSERVACIONES,
        FECHA_REGISTRO: value.FECHA_REGISTRO,
  }

  console.log(postObjet);

  if (postObjet.ID === null ) {
   console.log("Es nuevo");
    this.inicioDeCarpetaService.addInicioDeCarpeta(postObjet).subscribe((res) => {
      console.log(res);
      this.post.push(postObjet);
  });
  } else {
    console.log("Vamos a editar");
    this.inicioDeCarpetaService.editInicioDeCarpeta(postObjet).subscribe((res) => {
    console.log(res);
    this.post.push(postObjet);
    });
  }
 
}

onNoClick() {
  this.dialogRef.close();
}

public confirmAdd(): void{
  this.inicioDeCarpetaService.addInicioDeCarpeta(this.proForm.getRawValue());
}

}