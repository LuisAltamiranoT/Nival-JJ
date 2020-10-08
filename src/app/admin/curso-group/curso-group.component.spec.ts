import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoGroupComponent } from './curso-group.component';

describe('CursoGroupComponent', () => {
  let component: CursoGroupComponent;
  let fixture: ComponentFixture<CursoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
