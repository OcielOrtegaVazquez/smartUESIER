import { TestBed } from '@angular/core/testing';

import { AcuerdoAseguramientoBienesService } from './acuerdo-aseguramiento-bienes.service';

describe('AcuerdoAseguramientoBienesService', () => {
  let service: AcuerdoAseguramientoBienesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcuerdoAseguramientoBienesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
