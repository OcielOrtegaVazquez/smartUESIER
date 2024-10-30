import { TestBed } from '@angular/core/testing';

import { DemandaDeExtincionDeDominioService } from './demanda-de-extincion-de-dominio.service';

describe('DemandaDeExtincionDeDominioService', () => {
  let service: DemandaDeExtincionDeDominioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandaDeExtincionDeDominioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
