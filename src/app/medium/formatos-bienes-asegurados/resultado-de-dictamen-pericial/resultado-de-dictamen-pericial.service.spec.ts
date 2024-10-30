import { TestBed } from '@angular/core/testing';

import { ResultadoDeDictamenPericialService } from './resultado-de-dictamen-pericial.service';

describe('ResultadoDeDictamenPericialService', () => {
  let service: ResultadoDeDictamenPericialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoDeDictamenPericialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
