import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinacionPorIncompetenciaComponent } from './declinacion-por-incompetencia.component';

describe('DeclinacionPorIncompetenciaComponent', () => {
  let component: DeclinacionPorIncompetenciaComponent;
  let fixture: ComponentFixture<DeclinacionPorIncompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclinacionPorIncompetenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclinacionPorIncompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
