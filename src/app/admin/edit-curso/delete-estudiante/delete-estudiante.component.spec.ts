import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEstudianteComponent } from './delete-estudiante.component';

describe('DeleteEstudianteComponent', () => {
  let component: DeleteEstudianteComponent;
  let fixture: ComponentFixture<DeleteEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
