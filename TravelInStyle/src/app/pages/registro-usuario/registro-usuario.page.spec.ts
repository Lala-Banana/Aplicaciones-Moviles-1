import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioPage } from './registro-usuario.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('RegistroUsuarioPage', () => {
  let component: RegistroUsuarioPage;
  let fixture: ComponentFixture<RegistroUsuarioPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()],
      imports:[AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)]
    })

    fixture = TestBed.createComponent(RegistroUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
