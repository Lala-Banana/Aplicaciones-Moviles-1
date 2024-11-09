import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarVehiculoPage } from './agregar-vehiculo.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('AgregarVehiculoPage', () => {
  let component: AgregarVehiculoPage;
  let fixture: ComponentFixture<AgregarVehiculoPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()],
      imports:[AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)]
    })

    fixture = TestBed.createComponent(AgregarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});


