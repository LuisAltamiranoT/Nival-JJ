import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIndividualComponent } from './reporte-individual.component';

describe('ReporteIndividualComponent', () => {
  let component: ReporteIndividualComponent;
  let fixture: ComponentFixture<ReporteIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
