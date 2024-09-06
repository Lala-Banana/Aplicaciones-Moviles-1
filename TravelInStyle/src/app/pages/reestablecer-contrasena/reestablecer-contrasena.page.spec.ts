import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReestablecerContrasenaPage } from './reestablecer-contrasena.page';

describe('ReestablecerContrasenaPage', () => {
  let component: ReestablecerContrasenaPage;
  let fixture: ComponentFixture<ReestablecerContrasenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
