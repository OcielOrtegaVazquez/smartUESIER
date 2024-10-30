import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstadosJuridicosComponent } from './dashboard-estados-juridicos.component';

describe('DashboardEstadosJuridicosComponent', () => {
  let component: DashboardEstadosJuridicosComponent;
  let fixture: ComponentFixture<DashboardEstadosJuridicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEstadosJuridicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEstadosJuridicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
