import { TestBed } from '@angular/core/testing';

import { InicioDeCarpetaService } from './inicio-de-carpeta.service';

describe('InicioDeCarpetaService', () => {
  let service: InicioDeCarpetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicioDeCarpetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
