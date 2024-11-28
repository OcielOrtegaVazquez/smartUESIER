import { TestBed } from '@angular/core/testing';

import { DestruccionDelBienService } from './destruccion-del-bien.service';

describe('DestruccionDelBienService', () => {
  let service: DestruccionDelBienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestruccionDelBienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
