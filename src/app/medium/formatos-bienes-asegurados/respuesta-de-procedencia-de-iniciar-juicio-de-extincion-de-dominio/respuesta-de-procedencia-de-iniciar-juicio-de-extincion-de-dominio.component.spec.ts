import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent } from './respuesta-de-procedencia-de-iniciar-juicio-de-extincion-de-dominio.component';

describe('RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent', () => {
  let component: RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent;
  let fixture: ComponentFixture<RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
