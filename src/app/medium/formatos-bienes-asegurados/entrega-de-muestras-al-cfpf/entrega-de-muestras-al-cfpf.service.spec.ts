import { TestBed } from '@angular/core/testing';

import { EntregaDeMuestrasAlCfpfService } from './entrega-de-muestras-al-cfpf.service';

describe('EntregaDeMuestrasAlCfpfService', () => {
  let service: EntregaDeMuestrasAlCfpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaDeMuestrasAlCfpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
