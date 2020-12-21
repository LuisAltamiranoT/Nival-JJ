import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEditImagenComponent } from './ver-edit-imagen.component';

describe('VerEditImagenComponent', () => {
  let component: VerEditImagenComponent;
  let fixture: ComponentFixture<VerEditImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEditImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEditImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
