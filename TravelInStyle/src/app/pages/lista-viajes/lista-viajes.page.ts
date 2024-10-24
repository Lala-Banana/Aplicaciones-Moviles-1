import { Component, OnInit } from '@angular/core';
import { Viaje } from './viaje';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.page.html',
  styleUrls: ['./lista-viajes.page.scss'],
})
export class ListaViajesPage implements OnInit {
  public loaded = false;
  viajes: Viaje[] = [];
  usuario:UserModel[]=[];
  usuarioId: number=0;

  public nuevoViaje: string = '';
  constructor(private router: Router,
              private viajeService : ViajeService,
              private storage: StorageService,
              private usuarioService: UsuarioService
  ) { 
    setTimeout(() => {
      this.loaded = true;
    }, 3000);


  }

  ngOnInit(
    

  ) {
    /* this.cargarUsuario();
    this.cargarViajes();
    this.viajes.push({
      costo: 250000,
      fecha: '2024-09-15',
      ubicacionOrigen: 'Santiago',
      ubicacionDestino: 'Valparaíso',
      nombreProducto: 'Tour Costero'
    }); */
    this.cargarViajes()
  }

  agregarViaje(){
    this.router.navigate(['/viaje']);
  }

  async cargarViajes(){

    let dataStorage = await this.storage.obtenerStorage();
    console.log('se obtuvo storage');
    const req = await this.viajeService.obtenerViaje(dataStorage[0].token);
    console.log('dataStorage[0].token',dataStorage[0].token);
    console.log(req);
    this.viajes = req.data;
    console.log(this.viajes)
    console.log('req.data[0]',req.data[0])
    console.log('req.data[1].id',req.data[1].id)
    console.log('req.data[1].ubicacionDestino',typeof req.data[1].ubicacion_destino)
    console.log('req.data[1].ubicacionDestino', req.data[1].ubicacion_destino)
    console.log('Cantidad de elementos en req.data:', req.data.length);

  }

  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();
    
    const req = await this.usuarioService.obtenerUsuario(
      {
        p_correo:dataStorage[0].usuario_correo,
        token:dataStorage[0].token
      }
    );
    this.usuario = req.data;
    console.log("DATA INICIO USUARIO ", this.usuario);
    if (this.usuario.length > 0) {
      this.usuarioId = this.usuario[0].id_usuario; // Asignar el ID del usuario actual
      console.log("ID del usuario actual: ", this.usuarioId);

      // Cargar los vehículos después de obtener el usuario
      this.cargarViajes();
  }

}
}

