import { TestBed } from '@angular/core/testing';

import { CambioDeUbicacionDelBienParaResguardoService } from './cambio-de-ubicacion-del-bien-para-resguardo.service';

describe('CambioDeUbicacionDelBienParaResguardoService', () => {
  let service: CambioDeUbicacionDelBienParaResguardoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioDeUbicacionDelBienParaResguardoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
