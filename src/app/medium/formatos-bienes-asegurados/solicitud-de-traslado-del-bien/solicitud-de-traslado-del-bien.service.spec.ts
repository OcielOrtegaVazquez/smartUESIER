import { TestBed } from '@angular/core/testing';

import { SolicitudDeTrasladoDelBienService } from './solicitud-de-traslado-del-bien.service';

describe('SolicitudDeTrasladoDelBienService', () => {
  let service: SolicitudDeTrasladoDelBienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDeTrasladoDelBienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
