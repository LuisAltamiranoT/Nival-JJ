import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstudianteComponent } from './add-estudiante.component';

describe('AddEstudianteComponent', () => {
  let component: AddEstudianteComponent;
  let fixture: ComponentFixture<AddEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
