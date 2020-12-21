import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaAnteriorComponent } from './asistencia-anterior.component';

describe('AsistenciaAnteriorComponent', () => {
  let component: AsistenciaAnteriorComponent;
  let fixture: ComponentFixture<AsistenciaAnteriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaAnteriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaAnteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
