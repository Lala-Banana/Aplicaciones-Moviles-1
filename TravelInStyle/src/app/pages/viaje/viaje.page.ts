import { Viaje } from './../lista-viajes/viaje';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculo } from '../listar-vehiculo/vehiculo';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private alertController: AlertController,
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private viajeService: ViajeService,
    private router: Router,
    private helper: HelperService,
    private vehiculoService: VehiculoService
  ) { }

  ngOnInit() {
  }

  nuevoViaje: Viaje = {
    costo: 0,
    fecha: '',
    ubicacion_origen: '',
    ubicacion_destino: '',
    id_vehiculo: 0
  };

  vehiculos: Vehiculo[] = []; // Aquí almacenaremos los vehículos del usuario
  vehiculoSeleccionado: number = 0; // ID del vehículo seleccionado
  idVehiculo: number =0;


  async agregarViaje(){
    
      // Obtener el token almacenado
      let tokenData = await this.storage.obtenerStorage();
      console.log("TokenDataaa", tokenData);
      const token = tokenData[0].token
      try {
        if(token){
          const req = await this.viajeService.agregarViaje({
            p_id_usuario: tokenData[0].usuario_id,
            p_id_vehiculo: 4, 
            p_costo: this.nuevoViaje.costo,
            p_ubicacion_origen: this.nuevoViaje.ubicacion_origen,
            p_ubicacion_destino: this.nuevoViaje.ubicacion_destino,
            token: token,
          });
          await this.helper.showAlert("Viaje agregado Correctamente","");
          await this.router.navigateByUrl('/inicio');
        }
    } catch (error) {
      console.error('Error al obtener la informacion',error)
    }


  }


}
