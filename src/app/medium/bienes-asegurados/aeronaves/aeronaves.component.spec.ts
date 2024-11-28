import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeronavesComponent } from './aeronaves.component';

describe('AeronavesComponent', () => {
  let component: AeronavesComponent;
  let fixture: ComponentFixture<AeronavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AeronavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AeronavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
