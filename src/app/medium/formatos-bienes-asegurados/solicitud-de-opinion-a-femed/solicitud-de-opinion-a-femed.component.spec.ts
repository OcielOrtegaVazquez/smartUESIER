import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDeOpinionAFemedComponent } from './solicitud-de-opinion-a-femed.component';

describe('SolicitudDeOpinionAFemedComponent', () => {
  let component: SolicitudDeOpinionAFemedComponent;
  let fixture: ComponentFixture<SolicitudDeOpinionAFemedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudDeOpinionAFemedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudDeOpinionAFemedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
