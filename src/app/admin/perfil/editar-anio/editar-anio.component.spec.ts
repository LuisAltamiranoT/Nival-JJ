import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnioComponent } from './editar-anio.component';

describe('EditarAnioComponent', () => {
  let component: EditarAnioComponent;
  let fixture: ComponentFixture<EditarAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
