import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDeAmpfComponent } from './cambio-de-ampf.component';

describe('CambioDeAmpfComponent', () => {
  let component: CambioDeAmpfComponent;
  let fixture: ComponentFixture<CambioDeAmpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioDeAmpfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioDeAmpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
