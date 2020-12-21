import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImageComponent } from './ver-image.component';

describe('VerImageComponent', () => {
  let component: VerImageComponent;
  let fixture: ComponentFixture<VerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
