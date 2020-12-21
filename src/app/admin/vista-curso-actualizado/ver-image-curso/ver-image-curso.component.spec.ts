import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImageCursoComponent } from './ver-image-curso.component';

describe('VerImageCursoComponent', () => {
  let component: VerImageCursoComponent;
  let fixture: ComponentFixture<VerImageCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImageCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerImageCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
