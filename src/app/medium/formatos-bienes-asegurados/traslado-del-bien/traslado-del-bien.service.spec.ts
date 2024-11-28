import { TestBed } from '@angular/core/testing';

import { TrasladoDelBienService } from './traslado-del-bien.service';

describe('TrasladoDelBienService', () => {
  let service: TrasladoDelBienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasladoDelBienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
