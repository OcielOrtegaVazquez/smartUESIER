import { TestBed } from '@angular/core/testing';

import { DeclinacionPorIncompetenciaService } from './declinacion-por-incompetencia.service';

describe('DeclinacionPorIncompetenciaService', () => {
  let service: DeclinacionPorIncompetenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclinacionPorIncompetenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
