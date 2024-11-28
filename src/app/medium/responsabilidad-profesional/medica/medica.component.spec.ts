import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaComponent } from './medica.component';

describe('MedicaComponent', () => {
  let component: MedicaComponent;
  let fixture: ComponentFixture<MedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
