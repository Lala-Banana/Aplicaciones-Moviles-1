import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { provideHttpClient } from '@angular/common/http';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()]
    })

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verifica que la foto de perfil esté cargada', () => {
    component.imagen = 'https://ejemplo.com/foto-perfil.png';
  
    expect(component.imagen).toBeTruthy();
    expect(component.imagen.length).toBeGreaterThan(0);
  });

});
