import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEstadosJuridicosComponent } from './historial-estados-juridicos.component';

describe('HistorialEstadosJuridicosComponent', () => {
  let component: HistorialEstadosJuridicosComponent;
  let fixture: ComponentFixture<HistorialEstadosJuridicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialEstadosJuridicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialEstadosJuridicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
