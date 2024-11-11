import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()],
      imports:[AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)]
    })

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verifica campos login no esten vacios', () => {
    component.correo = 'lala@lala.cl'
    component.contrasena = '123456' 
    expect(component.correo).toBeTruthy();
    expect(component.contrasena).toBeTruthy();
  });

  it('valida formato correo', () => {
    component.correo = 'test@example.com';
    expect(component.validarFormatoCorreo()).toBeTrue();
  });

});
