import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionDelBienComponent } from './devolucion-del-bien.component';

describe('DevolucionDelBienComponent', () => {
  let component: DevolucionDelBienComponent;
  let fixture: ComponentFixture<DevolucionDelBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionDelBienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolucionDelBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
