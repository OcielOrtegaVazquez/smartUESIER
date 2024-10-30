import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesADisposicionComponent } from './bienes-a-disposicion.component';

describe('BienesADisposicionComponent', () => {
  let component: BienesADisposicionComponent;
  let fixture: ComponentFixture<BienesADisposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienesADisposicionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BienesADisposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
