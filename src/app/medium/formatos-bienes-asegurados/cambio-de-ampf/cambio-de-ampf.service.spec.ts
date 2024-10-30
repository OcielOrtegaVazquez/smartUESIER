import { TestBed } from '@angular/core/testing';

import { CambioDeAmpfService } from './cambio-de-ampf.service';

describe('CambioDeAmpfService', () => {
  let service: CambioDeAmpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioDeAmpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
