import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResponsabilidadProfesionalComponent } from './dashboard-responsabilidad-profesional.component';

describe('DashboardResponsabilidadProfesionalComponent', () => {
  let component: DashboardResponsabilidadProfesionalComponent;
  let fixture: ComponentFixture<DashboardResponsabilidadProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardResponsabilidadProfesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardResponsabilidadProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
