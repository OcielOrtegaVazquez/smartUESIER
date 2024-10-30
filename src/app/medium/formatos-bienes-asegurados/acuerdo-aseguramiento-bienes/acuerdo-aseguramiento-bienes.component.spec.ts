import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuerdoAseguramientoBienesComponent } from './acuerdo-aseguramiento-bienes.component';

describe('AcuerdoAseguramientoBienesComponent', () => {
  let component: AcuerdoAseguramientoBienesComponent;
  let fixture: ComponentFixture<AcuerdoAseguramientoBienesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuerdoAseguramientoBienesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcuerdoAseguramientoBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
