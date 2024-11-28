import { TestBed } from '@angular/core/testing';

import { EntregaRecepcionDelBienNuevaUbicacionService } from './entrega-recepcion-del-bien-nueva-ubicacion.service';

describe('EntregaRecepcionDelBienNuevaUbicacionService', () => {
  let service: EntregaRecepcionDelBienNuevaUbicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaRecepcionDelBienNuevaUbicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
