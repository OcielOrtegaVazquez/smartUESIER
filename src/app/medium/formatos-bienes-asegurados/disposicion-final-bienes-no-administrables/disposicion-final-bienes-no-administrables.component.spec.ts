import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposicionFinalBienesNoAdministrablesComponent } from './disposicion-final-bienes-no-administrables.component';

describe('DisposicionFinalBienesNoAdministrablesComponent', () => {
  let component: DisposicionFinalBienesNoAdministrablesComponent;
  let fixture: ComponentFixture<DisposicionFinalBienesNoAdministrablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisposicionFinalBienesNoAdministrablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposicionFinalBienesNoAdministrablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
