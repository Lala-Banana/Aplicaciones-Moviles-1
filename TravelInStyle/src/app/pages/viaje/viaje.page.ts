import { Component, OnInit } from '@angular/core';
import { Viaje } from '../lista-viajes/viaje';
import { AlertController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  viajes:any[]=[];


  constructor(private alertController: AlertController,
              private storage:StorageService,
              private viajeService:ViajeService,
  ) { }

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
