import { VehiculoService } from './../../services/vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../listar-vehiculo/vehiculo';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {

  p_id_vehiculo: number= 999;
  p_patente: string = '';
  p_marca: string = '';
  p_modelo: string = '';
  p_anio: number=2010;
  p_color: string = '';
  p_tipo_combustible: string = '';
  imagen: any;


  constructor(private router:Router , private alertController: AlertController,
    private firebase:FirebaseService, 
    private VehiculoService:VehiculoService,
    private helper:HelperService,
    private storage: StorageService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  vehiculo: Vehiculo = {
    marca: '',
    modelo: '',
    color: '',
    patente: '',
    anio: 0,
    combustible: '',
    //capacidadPasajeros: 0,
    //idUsuario: 0,
  };
  
  async agregarVehiculo(){
    //const userFireBase = await this.firebase.registro(this.p_patente,this.p_modelo);
    //const token = await userFireBase.user?.getIdToken();

    try {
      //const token = await this.storage.obtenerStorage();
      //console.log("Token: ",token)
      // Obtener el token almacenado
      const tokenData = await this.storage.obtenerStorage();
      console.log("TokenData", tokenData);

      //if (tokenData && tokenData[0].token && tokenData[0].usuario_correo) {
        //Obtengo el usuario
        const usuarioInfo = await this.usuarioService.obtenerUsuario({
          p_correo: tokenData[0].usuario_correo,
          token: tokenData[0].token
        });
        //Y paso los parametros
        const req = await this.VehiculoService.agregarVehiculo({
          'p_id_usuario':tokenData[0].usuario_id,
          'p_patente':this.vehiculo.patente.toString(),
          'p_marca':this.vehiculo.marca.toString(),
          'p_modelo':this.vehiculo.modelo.toString(),  
          'p_anio':this.vehiculo.anio,
          'p_color':this.vehiculo.color.toString(),
          'p_tipo_combustible':this.vehiculo.combustible.toString(),
          
          
          //'p_capacidad_pasajeros':this.p_capacidad_pasajeros,
          'token':tokenData[0].token
        },this.imagen
        
      
      );
      await this.helper.showAlert("Vehiculo agregado Correctamente","");
      await this.router.navigateByUrl('inicio');
      
      //}
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }

    
}
async takePhoto(){
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  if(image.webPath){
    const response = await fetch(image.webPath);
    const blob = await response.blob();

    this.imagen = {
      fname: 'foto' + image.format,
      src:image.webPath,
      file: blob
    }
  }
  var imageUrl = image.webPath;
  this.imagen.src = imageUrl;
}


}
