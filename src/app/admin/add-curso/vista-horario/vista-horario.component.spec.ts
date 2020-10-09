import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHorarioComponent } from './vista-horario.component';

describe('VistaHorarioComponent', () => {
  let component: VistaHorarioComponent;
  let fixture: ComponentFixture<VistaHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
