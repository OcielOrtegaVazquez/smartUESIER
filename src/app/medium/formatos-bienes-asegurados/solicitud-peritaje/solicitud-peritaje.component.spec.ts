import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPeritajeComponent } from './solicitud-peritaje.component';

describe('SolicitudPeritajeComponent', () => {
  let component: SolicitudPeritajeComponent;
  let fixture: ComponentFixture<SolicitudPeritajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPeritajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudPeritajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
