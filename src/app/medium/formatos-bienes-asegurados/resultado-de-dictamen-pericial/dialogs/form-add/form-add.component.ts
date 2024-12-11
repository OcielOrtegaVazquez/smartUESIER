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
import { CatFiscalia, CatFiscaliaFederal, CatAMPF, CatCargo, CatTipoBien, ResultadoDictamenPericial } from '../../resultado-de-dictamen-pericial.model';
import { ResultadoDeDictamenPericialComponent } from '../../resultado-de-dictamen-pericial.component';
import { ResultadoDeDictamenPericialService } from '../../resultado-de-dictamen-pericial.service';

export interface DialogData{
  ID: number;
  action: string;
  resultadoDictamenPericial: ResultadoDictamenPericial
}

export interface ResultadoDictamenPericialForm{
  ID: number;
  CI: string;
  ID_CI: number;
  FECHA_CI: Date;
  NUMERO_REGISTRO_EN_JN: string;
  ID_CAT_FISCALIA: number;
  ID_CAT_FISCALIA_FEDERAL: number;
  ID_CAT_EMPLEADO_REALIZA_PERITAJE: number;
  ID_CAT_ROL_REALIZA_PERITAJE: number;
  ID_CAT_EMPLEADO_FIRMA_DICTAMEN: number;
  ID_CAT_ROL_FIRMA_DICTAMEN: number;
  ID_CAT_TIPO_DE_BIEN: number;
  CARACTERISTICAS: string;
  FOLIO_DICTAMEN_PERICIAL: string;
  OFICIO_DICTAMEN_PERICIAL: string;
  FECHA_DICTAMEN_PERICIAL: Date;
  FOLIO_ENTREGA_DICTAMEN_PERICIAL: string;
  OFICIO_ENTREGA_DICTAMEN_PERICIAL: string;
  FECHA_ENTREGA_DICTAMEN_PERICIAL: Date;
  OBSERVACIONES: string;
  FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL: Date;
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
        ResultadoDeDictamenPericialComponent
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  resultadoDictamenPericial: ResultadoDictamenPericial;

  formValue!: FormGroup;
  post: ResultadoDictamenPericial[] = [];

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
  constructor (public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public resultadoDeDictamenPericialService: ResultadoDeDictamenPericialService,
    public fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public httpClient: HttpClient
    
){
this.action = data.action;
if(this.action === 'edit'){
this.dialogTitle = data.resultadoDictamenPericial.CI;
this.resultadoDictamenPericial = data.resultadoDictamenPericial;
}else {
this.dialogTitle = 'Nuevo Registro';
const blankObjetc = {} as ResultadoDictamenPericial;
this.resultadoDictamenPericial = new ResultadoDictamenPericial(blankObjetc);
}

this.proForm = this.createResultadoDictamenPericialForm();
this.getCatFiscalia();
this.getCatFiscaliaFederal();
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
    this.resultadoDeDictamenPericialService.getAllFiscalias().then(catFiscalias => {
      this.FISCALIA = catFiscalias;
      console.log(catFiscalias);
    });
  }

  getCatFiscaliaFederal(){
    this.resultadoDeDictamenPericialService.getAllFiscaliasFederales().then(catFiscaliaFederal => {
      this.FISCALIA_FEDERAL = catFiscaliaFederal;
      console.log(catFiscaliaFederal);
    });
  }

  getCatAMPF(){
    this.resultadoDeDictamenPericialService.getAllAMPF().then(catAMPF => {
      this.AMPFS = catAMPF;
      console.log(catAMPF);
    });
  }

  getCatCargo(){
    this.resultadoDeDictamenPericialService.getAllCargo().then(catCargo => {
      this.CARGOS = catCargo;
      console.log(catCargo);
    });
  }

  getCatTipoBien(){
    this.resultadoDeDictamenPericialService.getAllTipoBien().then(catTipoBien => {
      this.TIPO_BIEN = catTipoBien;
      console.log(catTipoBien);
    });
  }

  createResultadoDictamenPericialForm(): UntypedFormGroup{
    return this.fb.group({
      ID: [this.resultadoDictamenPericial.ID],
      CI: [this.resultadoDictamenPericial.CI],
      ID_CI: [this.resultadoDictamenPericial.ID_CI],
      FECHA_CI: [this.resultadoDictamenPericial.FECHA_CI],
      NUMERO_REGISTRO_EN_JN: [this.resultadoDictamenPericial.NUMERO_REGISTRO_EN_JN],
      ID_CAT_FISCALIA: [this.resultadoDictamenPericial.ID_CAT_FISCALIA],
      ID_CAT_FISCALIA_FEDERAL: [this.resultadoDictamenPericial.ID_CAT_FISCALIA_FEDERAL],
      ID_CAT_EMPLEADO_REALIZA_PERITAJE: [this.resultadoDictamenPericial.ID_CAT_EMPLEADO_REALIZA_PERITAJE],
      ID_CAT_ROL_REALIZA_PERITAJE: [this.resultadoDictamenPericial.ID_CAT_ROL_REALIZA_PERITAJE],
      ID_CAT_EMPLEADO_FIRMA_DICTAMEN: [this.resultadoDictamenPericial.ID_CAT_EMPLEADO_FIRMA_DICTAMEN],
      ID_CAT_ROL_FIRMA_DICTAMEN: [this.resultadoDictamenPericial.ID],
      ID_CAT_TIPO_DE_BIEN: [this.resultadoDictamenPericial.ID],
      CARACTERISTICAS: [this.resultadoDictamenPericial.CARACTERISTICAS],
      FOLIO_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.FOLIO_DICTAMEN_PERICIAL],
      OFICIO_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.OFICIO_DICTAMEN_PERICIAL],
      FECHA_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.FECHA_DICTAMEN_PERICIAL],
      FOLIO_ENTREGA_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.FOLIO_ENTREGA_DICTAMEN_PERICIAL],
      OFICIO_ENTREGA_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.OFICIO_ENTREGA_DICTAMEN_PERICIAL],
      FECHA_ENTREGA_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.FECHA_ENTREGA_DICTAMEN_PERICIAL],
      OBSERVACIONES: [this.resultadoDictamenPericial.OBSERVACIONES],
      FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL: [this.resultadoDictamenPericial.FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL]

    })
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
      ID_CAT_EMPLEADO_REALIZA_PERITAJE: value.ID_CAT_EMPLEADO_REALIZA_PERITAJE,
      ID_CAT_ROL_REALIZA_PERITAJE: value.ID_CAT_ROL_REALIZA_PERITAJE,
      ID_CAT_EMPLEADO_FIRMA_DICTAMEN: value.ID_CAT_EMPLEADO_FIRMA_DICTAMEN,
      ID_CAT_ROL_FIRMA_DICTAMEN: value.ID_CAT_ROL_FIRMA_DICTAMEN,
      ID_CAT_TIPO_DE_BIEN: value.ID_CAT_TIPO_DE_BIEN,
      CARACTERISTICAS: value.CARACTERISTICAS,
      FOLIO_DICTAMEN_PERICIAL: value.FOLIO_DICTAMEN_PERICIAL,
      OFICIO_DICTAMEN_PERICIAL: value.OFICIO_DICTAMEN_PERICIAL,
      FECHA_DICTAMEN_PERICIAL: value.FECHA_DICTAMEN_PERICIAL,
      FOLIO_ENTREGA_DICTAMEN_PERICIAL: value.FOLIO_ENTREGA_DICTAMEN_PERICIAL,
      OFICIO_ENTREGA_DICTAMEN_PERICIAL: value.OFICIO_ENTREGA_DICTAMEN_PERICIAL,
      FECHA_ENTREGA_DICTAMEN_PERICIAL: value.FECHA_ENTREGA_DICTAMEN_PERICIAL,
      OBSERVACIONES: value.OBSERVACIONES,
      FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL: value.FECHA_REGISTRO_DICTAMEN_PERICIAL,
    }
    console.log(postObject);

    console.log(postObject);

    if (postObject.FOLIO_DICTAMEN_PERICIAL === null){
      console.log('Es nuevo');
    this.resultadoDeDictamenPericialService.addResultadoDictamenPericial(postObject).subscribe((res) => {
      console.log(res);
      this.post.push(postObject);
      console.log(postObject);
    });
    } else {
      console.log('vamos a editar');
      this.resultadoDeDictamenPericialService.editResultadoDictamenPericial(postObject).subscribe((res) => {
        console.log(res);
        this.post.push(postObject);
      });
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  public confirmAdd(): void{
    this.resultadoDeDictamenPericialService.addResultadoDictamenPericial(this.proForm.getRawValue());
  }

}
