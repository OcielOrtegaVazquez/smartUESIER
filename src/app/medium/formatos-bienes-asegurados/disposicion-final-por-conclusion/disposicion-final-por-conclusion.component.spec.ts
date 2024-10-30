import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposicionFinalPorConclusionComponent } from './disposicion-final-por-conclusion.component';

describe('DisposicionFinalPorConclusionComponent', () => {
  let component: DisposicionFinalPorConclusionComponent;
  let fixture: ComponentFixture<DisposicionFinalPorConclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisposicionFinalPorConclusionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposicionFinalPorConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
