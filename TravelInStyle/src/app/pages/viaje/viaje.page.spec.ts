import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajePage } from './viaje.page';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('ViajePage', () => {
  let component: ViajePage;
  let fixture: ComponentFixture<ViajePage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()],
      imports:[AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)]
    })

    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
