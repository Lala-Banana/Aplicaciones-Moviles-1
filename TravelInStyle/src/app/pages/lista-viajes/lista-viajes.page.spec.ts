import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaViajesPage } from './lista-viajes.page';
import { provideHttpClient } from '@angular/common/http';

describe('ListaViajesPage', () => {
  let component: ListaViajesPage;
  let fixture: ComponentFixture<ListaViajesPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[provideHttpClient()]
    })

    fixture = TestBed.createComponent(ListaViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
