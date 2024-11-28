import { TestBed } from '@angular/core/testing';

import { DevolucionDelBienService } from './devolucion-del-bien.service';

describe('DevolucionDelBienService', () => {
  let service: DevolucionDelBienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevolucionDelBienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
