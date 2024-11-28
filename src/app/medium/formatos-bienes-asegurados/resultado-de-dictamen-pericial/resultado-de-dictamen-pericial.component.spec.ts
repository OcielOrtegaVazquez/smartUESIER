import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoDeDictamenPericialComponent } from './resultado-de-dictamen-pericial.component';

describe('ResultadoDeDictamenPericialComponent', () => {
  let component: ResultadoDeDictamenPericialComponent;
  let fixture: ComponentFixture<ResultadoDeDictamenPericialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoDeDictamenPericialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadoDeDictamenPericialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
