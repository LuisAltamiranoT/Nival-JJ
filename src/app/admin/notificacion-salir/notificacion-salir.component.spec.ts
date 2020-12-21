import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionSalirComponent } from './notificacion-salir.component';

describe('NotificacionSalirComponent', () => {
  let component: NotificacionSalirComponent;
  let fixture: ComponentFixture<NotificacionSalirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionSalirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionSalirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
