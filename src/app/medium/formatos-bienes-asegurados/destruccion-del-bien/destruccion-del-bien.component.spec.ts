import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestruccionDelBienComponent } from './destruccion-del-bien.component';

describe('DestruccionDelBienComponent', () => {
  let component: DestruccionDelBienComponent;
  let fixture: ComponentFixture<DestruccionDelBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestruccionDelBienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestruccionDelBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
