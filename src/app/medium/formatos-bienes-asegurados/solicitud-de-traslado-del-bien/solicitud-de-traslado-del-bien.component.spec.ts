import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDeTrasladoDelBienComponent } from './solicitud-de-traslado-del-bien.component';

describe('SolicitudDeTrasladoDelBienComponent', () => {
  let component: SolicitudDeTrasladoDelBienComponent;
  let fixture: ComponentFixture<SolicitudDeTrasladoDelBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudDeTrasladoDelBienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudDeTrasladoDelBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
