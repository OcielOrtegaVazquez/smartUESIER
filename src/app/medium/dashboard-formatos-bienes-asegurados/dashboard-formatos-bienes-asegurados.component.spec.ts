import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFormatosBienesAseguradosComponent } from './dashboard-formatos-bienes-asegurados.component';

describe('DashboardFormatosBienesAseguradosComponent', () => {
  let component: DashboardFormatosBienesAseguradosComponent;
  let fixture: ComponentFixture<DashboardFormatosBienesAseguradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFormatosBienesAseguradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFormatosBienesAseguradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
