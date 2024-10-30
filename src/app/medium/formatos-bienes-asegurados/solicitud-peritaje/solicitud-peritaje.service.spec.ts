import { TestBed } from '@angular/core/testing';

import { SolicitudPeritajeService } from './solicitud-peritaje.service';

describe('SolicitudPeritajeService', () => {
  let service: SolicitudPeritajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudPeritajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
