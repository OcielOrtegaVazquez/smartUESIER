import { TestBed } from '@angular/core/testing';

import { DisposicionFinalPorConclusionService } from './disposicion-final-por-conclusion.service';

describe('DisposicionFinalPorConclusionService', () => {
  let service: DisposicionFinalPorConclusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposicionFinalPorConclusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
