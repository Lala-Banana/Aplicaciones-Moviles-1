import { Component, OnInit } from '@angular/core';
import { Viaje } from './viaje'; // Asegúrate de que Viaje esté correctamente definido
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';

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
      this.viajes = req.data.filter((viaje: Viaje) => viaje.id_usuario === this.usuarioId);
      console.error('Error al cargar los viajes:');
      
    } finally {
      this.loaded = true; 
    }
  }







}
