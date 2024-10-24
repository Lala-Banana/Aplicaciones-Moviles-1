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
    ubicacionOrigen: '',
    ubicacionDestino: '',
    nombreProducto: ''
  };

  vehiculos: Vehiculo[] = []; // Aquí almacenaremos los vehículos del usuario
  vehiculoSeleccionado: number = 0; // ID del vehículo seleccionado


  async agregarViaje(){
    try {
      // Obtener el token almacenado
      const tokenData = await this.storage.obtenerStorage();
      console.log("TokenData", tokenData);
      //Obtengo el usuario
      const usuarioInfo = await this.usuarioService.obtenerUsuario({
        p_correo: tokenData[0].usuario_correo,
        token: tokenData[0].token
      });
      // Obtener los vehículos del usuario
      const requ = await this.vehiculoService.obtenerVehiculo(tokenData[0].token);
      this.vehiculos = requ.data;


      //Y paso los parametros
      const req = await this.viajeService.agregarViaje({
        'p_id_usuario':tokenData[0].usuario_id,
        'p_ubicacion_origen':this.nuevoViaje.ubicacionOrigen,
        'p_ubicacion_destino':this.nuevoViaje.ubicacionDestino,
        'p_costo':this.nuevoViaje.costo,  
        'P_id_vehiculo':this.vehiculoSeleccionado,
        'Token':tokenData[0].token
      }
    );
    await this.helper.showAlert("Viaje agregado Correctamente","");
    await this.router.navigateByUrl('/inicio');


    } catch (error) {
      console.error('Error al obtener la informacion',error)
    }


  }


}
