import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaReportesComponent } from './vista-reportes.component';

describe('VistaReportesComponent', () => {
  let component: VistaReportesComponent;
  let fixture: ComponentFixture<VistaReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
