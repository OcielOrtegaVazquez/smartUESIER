import { TestBed } from '@angular/core/testing';

import { SolicitudDeOpinionAFemedService } from './solicitud-de-opinion-a-femed.service';

describe('SolicitudDeOpinionAFemedService', () => {
  let service: SolicitudDeOpinionAFemedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDeOpinionAFemedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
