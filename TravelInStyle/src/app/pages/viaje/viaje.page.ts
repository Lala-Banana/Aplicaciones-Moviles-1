import { ViajeService } from './../../services/viaje.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  p_ubicacion_origen: string = '';
  p_ubicacion_destino: string = '';
  p_costo: number = 0;
  p_id_vehiculo: number = 0;
  

  constructor(
    private router: Router,
    private alertController: AlertController,
    private firebase: FirebaseService, 
    private viajeService: ViajeService,
    private helper: HelperService,
    private storage: StorageService,
    private usuarioService: UsuarioService
  ) { 
    this.p_ubicacion_origen = '';
    this.p_ubicacion_destino = '';
    this.p_costo = 0;
    this.p_id_vehiculo = 0;
  }

  ngOnInit() { }

  async agregarViaje() {
    try {
      // Obtener el token almacenado
      const tokenData = await this.storage.obtenerStorage();
      console.log("TokenData", tokenData);

      // Obtener la información del usuario
      const usuarioInfo = await this.usuarioService.obtenerUsuario({
        p_correo: tokenData[0].usuario_correo,
        token: tokenData[0].token
      });

      // Preparar la solicitud para agregar el viaje
      const req = await this.viajeService.agregarViaje({
        'p_id_usuario': tokenData[0].usuario_id,
        'p_ubicacion_origen': this.p_ubicacion_origen.toString(),
        'p_ubicacion_destino': this.p_ubicacion_destino.toString(),
        'p_costo': this.p_costo,
        'p_id_vehiculo': this.p_id_vehiculo,
        'token': tokenData[0].token
      });

      // Mostrar alerta y navegar
      await this.helper.showAlert("Viaje agregado correctamente", "");
      await this.router.navigateByUrl('inicio');

    } catch (error) {
      console.error('Error al agregar el viaje:', error);
    }
  }
}

