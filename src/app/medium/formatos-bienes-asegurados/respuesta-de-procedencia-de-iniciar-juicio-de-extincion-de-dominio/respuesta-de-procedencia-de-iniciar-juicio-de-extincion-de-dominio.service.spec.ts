import { TestBed } from '@angular/core/testing';

import { RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioService } from './respuesta-de-procedencia-de-iniciar-juicio-de-extincion-de-dominio.service';

describe('RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioService', () => {
  let service: RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaDeProcedenciaDeIniciarJuicioDeExtincionDeDominioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
