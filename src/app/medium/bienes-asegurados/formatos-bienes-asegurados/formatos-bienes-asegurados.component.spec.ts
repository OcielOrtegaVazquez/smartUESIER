import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatosBienesAseguradosComponent } from './formatos-bienes-asegurados.component';

describe('FormatosBienesAseguradosComponent', () => {
  let component: FormatosBienesAseguradosComponent;
  let fixture: ComponentFixture<FormatosBienesAseguradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatosBienesAseguradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormatosBienesAseguradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
