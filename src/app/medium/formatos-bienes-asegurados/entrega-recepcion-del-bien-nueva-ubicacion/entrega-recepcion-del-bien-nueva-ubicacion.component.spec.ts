import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaRecepcionDelBienNuevaUbicacionComponent } from './entrega-recepcion-del-bien-nueva-ubicacion.component';

describe('EntregaRecepcionDelBienNuevaUbicacionComponent', () => {
  let component: EntregaRecepcionDelBienNuevaUbicacionComponent;
  let fixture: ComponentFixture<EntregaRecepcionDelBienNuevaUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntregaRecepcionDelBienNuevaUbicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntregaRecepcionDelBienNuevaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
