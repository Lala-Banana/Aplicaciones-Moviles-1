import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../listar-vehiculo/vehiculo';
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  vehiculo: Vehiculo = {
    marca: '',
    modelo: '',
    color: '',
    patente: '',
    anio: 0,
    combustible: '',
    capacidadPasajeros: 0,
    idUsuario: 0,
    nombreProyecto: ''
  };

  agregarVehiculo(){
    alert("Viaje agregado");
    console.log(this.vehiculo);
  }
}
