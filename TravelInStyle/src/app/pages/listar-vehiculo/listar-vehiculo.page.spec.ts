import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarVehiculoPage } from './listar-vehiculo.page';

describe('ListarVehiculoPage', () => {
  let component: ListarVehiculoPage;
  let fixture: ComponentFixture<ListarVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
