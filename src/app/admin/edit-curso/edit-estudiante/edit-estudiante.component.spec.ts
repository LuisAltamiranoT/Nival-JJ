import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstudianteComponent } from './edit-estudiante.component';

describe('EditEstudianteComponent', () => {
  let component: EditEstudianteComponent;
  let fixture: ComponentFixture<EditEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
