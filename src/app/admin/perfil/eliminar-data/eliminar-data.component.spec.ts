import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDataComponent } from './eliminar-data.component';

describe('EliminarDataComponent', () => {
  let component: EliminarDataComponent;
  let fixture: ComponentFixture<EliminarDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
