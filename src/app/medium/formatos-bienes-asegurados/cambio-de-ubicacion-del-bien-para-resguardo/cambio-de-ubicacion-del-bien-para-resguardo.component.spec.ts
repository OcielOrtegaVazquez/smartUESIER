import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDeUbicacionDelBienParaResguardoComponent } from './cambio-de-ubicacion-del-bien-para-resguardo.component';

describe('CambioDeUbicacionDelBienParaResguardoComponent', () => {
  let component: CambioDeUbicacionDelBienParaResguardoComponent;
  let fixture: ComponentFixture<CambioDeUbicacionDelBienParaResguardoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioDeUbicacionDelBienParaResguardoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioDeUbicacionDelBienParaResguardoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
