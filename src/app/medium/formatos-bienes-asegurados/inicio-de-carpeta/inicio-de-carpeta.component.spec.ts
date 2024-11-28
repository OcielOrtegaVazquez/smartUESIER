import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDeCarpetaComponent } from './inicio-de-carpeta.component';

describe('InicioDeCarpetaComponent', () => {
  let component: InicioDeCarpetaComponent;
  let fixture: ComponentFixture<InicioDeCarpetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioDeCarpetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioDeCarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
