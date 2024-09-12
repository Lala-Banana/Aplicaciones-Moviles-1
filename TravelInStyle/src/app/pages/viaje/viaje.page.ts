import { Component, OnInit } from '@angular/core';
import { Viaje } from '../lista-viajes/viaje';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  nuevoViaje: Viaje = {
    costo: 0,
    fecha: '',
    ubicacionOrigen: '',
    ubicacionDestino: '',
    nombreProducto: ''
  };

  onSubmit() {
    alert("Viaje agregado")
    console.log('Nuevo Viaje:', this.nuevoViaje);
    
  }
}
