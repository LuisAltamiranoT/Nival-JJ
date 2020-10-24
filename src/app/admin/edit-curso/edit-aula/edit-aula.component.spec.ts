import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAulaComponent } from './edit-aula.component';

describe('EditAulaComponent', () => {
  let component: EditAulaComponent;
  let fixture: ComponentFixture<EditAulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
