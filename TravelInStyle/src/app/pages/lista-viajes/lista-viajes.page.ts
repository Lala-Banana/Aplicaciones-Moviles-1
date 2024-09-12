import { Component, OnInit } from '@angular/core';
import { Viaje } from './viaje';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.page.html',
  styleUrls: ['./lista-viajes.page.scss'],
})
export class ListaViajesPage implements OnInit {

  viajes: Viaje[] = [];
  public nuevoViaje: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.viajes.push({
      costo: 250000,
      fecha: '2024-09-15',
      ubicacionOrigen: 'Santiago',
      ubicacionDestino: 'Valparaíso',
      nombreProducto: 'Tour Costero'
    });

  }

  agregarViaje(){
    this.router.navigate(['/viaje']);
  }

}
