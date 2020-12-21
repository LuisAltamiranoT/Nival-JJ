import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCursoActualizadoComponent } from './vista-curso-actualizado.component';

describe('VistaCursoActualizadoComponent', () => {
  let component: VistaCursoActualizadoComponent;
  let fixture: ComponentFixture<VistaCursoActualizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaCursoActualizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCursoActualizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
