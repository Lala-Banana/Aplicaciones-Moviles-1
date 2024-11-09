import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarVehiculoPage } from './listar-vehiculo.page';
import { provideHttpClient } from '@angular/common/http';

describe('ListarVehiculoPage', () => {
  let component: ListarVehiculoPage;
  let fixture: ComponentFixture<ListarVehiculoPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()]
    })

    fixture = TestBed.createComponent(ListarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
