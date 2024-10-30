import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaDeExtincionDeDominioComponent } from './demanda-de-extincion-de-dominio.component';

describe('DemandaDeExtincionDeDominioComponent', () => {
  let component: DemandaDeExtincionDeDominioComponent;
  let fixture: ComponentFixture<DemandaDeExtincionDeDominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandaDeExtincionDeDominioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandaDeExtincionDeDominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
