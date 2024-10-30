import { TestBed } from '@angular/core/testing';

import { AlmacenamientoCustodiaDelBienService } from './almacenamiento-custodia-del-bien.service';

describe('AlmacenamientoCustodiaDelBienService', () => {
  let service: AlmacenamientoCustodiaDelBienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenamientoCustodiaDelBienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
