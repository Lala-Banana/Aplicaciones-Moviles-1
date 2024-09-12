import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.page.html',
  styleUrls: ['./listar-vehiculo.page.scss'],
})
export class ListarVehiculoPage implements OnInit {
  vehiculos: Vehiculo[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.vehiculos.push({
      marca: 'Toyota',
      modelo: 'Corolla',
      patente: 'ABC123',
      capacidadPasajeros: 5,
      idUsuario: 123,
      color: 'Rojo',
      anio: 2000,
      combustible: 'Gasolina',
      nombreProyecto: 'Tour Costero'
    });
    }
    agregarVehiculo(){
      this.router.navigate(['/agregar-vehiculo']);
    }
  



}
