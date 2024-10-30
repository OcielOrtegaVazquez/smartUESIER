import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenamientoCustodiaDelBienComponent } from './almacenamiento-custodia-del-bien.component';

describe('AlmacenamientoCustodiaDelBienComponent', () => {
  let component: AlmacenamientoCustodiaDelBienComponent;
  let fixture: ComponentFixture<AlmacenamientoCustodiaDelBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenamientoCustodiaDelBienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmacenamientoCustodiaDelBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
