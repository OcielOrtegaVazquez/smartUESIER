import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerariosComponent } from './numerarios.component';

describe('NumerariosComponent', () => {
  let component: NumerariosComponent;
  let fixture: ComponentFixture<NumerariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumerariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumerariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
