import { TestBed } from '@angular/core/testing';

import { DisposicionFinalBienesNoAdministrablesService } from './disposicion-final-bienes-no-administrables.service';

describe('DisposicionFinalBienesNoAdministrablesService', () => {
  let service: DisposicionFinalBienesNoAdministrablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposicionFinalBienesNoAdministrablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
