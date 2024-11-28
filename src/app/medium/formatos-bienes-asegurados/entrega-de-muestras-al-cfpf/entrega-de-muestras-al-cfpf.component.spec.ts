import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDeMuestrasAlCfpfComponent } from './entrega-de-muestras-al-cfpf.component';

describe('EntregaDeMuestrasAlCfpfComponent', () => {
  let component: EntregaDeMuestrasAlCfpfComponent;
  let fixture: ComponentFixture<EntregaDeMuestrasAlCfpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntregaDeMuestrasAlCfpfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntregaDeMuestrasAlCfpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
