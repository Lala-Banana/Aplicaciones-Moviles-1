import { Component, OnInit } from '@angular/core';
import { Viaje } from './viaje'; // Asegúrate de que Viaje esté correctamente definido
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
import { HelperService } from 'src/app/services/helper.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.page.html',
  styleUrls: ['./lista-viajes.page.scss'],
})
export class ListaViajesPage implements OnInit {
  public loaded = false;
  viajes: Viaje[] = [];
  public nuevoViaje: string = '';
  usuarioId: number=35;
  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private storage: StorageService,
    private alertService: AlertController, 
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.cargarViajes(); 
  }

  agregarViaje() {
    this.router.navigate(['/viaje']);
  }

  async cargarViajes() {
    this.loaded = false; 
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.viajeService.obtenerViaje(dataStorage[0].token);
      console.log('storage y obtenerViaje Funcionan',req);
      this.viajes = req.data.filter((viaje: Viaje) => viaje.id_usuario === this.usuarioId);
      console.log(this.viajes);
      if (!this.viajes || this.viajes.length == 0){
        this.helperService.showAlert('No presenta viajes', 'Estado:');
      }
      
    } finally {
      this.loaded = true; 
    }
  }







}
