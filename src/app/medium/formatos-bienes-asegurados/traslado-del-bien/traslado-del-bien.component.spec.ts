import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoDelBienComponent } from './traslado-del-bien.component';

describe('TrasladoDelBienComponent', () => {
  let component: TrasladoDelBienComponent;
  let fixture: ComponentFixture<TrasladoDelBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrasladoDelBienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrasladoDelBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
