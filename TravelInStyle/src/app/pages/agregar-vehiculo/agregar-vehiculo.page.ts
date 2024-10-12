import { VehiculoService } from './../../services/vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../listar-vehiculo/vehiculo';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { Camera, CameraResultType } from '@capacitor/camera';
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
  p_capacidad_pasajeros: number= 4;
  imagen: any;

  constructor(private router:Router , private alertController: AlertController,
    private firebase:FirebaseService, 
    private VehiculoService:VehiculoService,
    private helper:HelperService,) { }

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
  

  async agregarVehiculo(){
    const userFireBase = await this.firebase.registro(this.p_patente,this.p_modelo);
    const token = await userFireBase.user?.getIdToken();
    if (token){
      const req = await this.VehiculoService.agregarVehiculo({
        'p_id_vehiculo':this.p_id_vehiculo,
        'p_patente':this.p_patente,
        'p_marca':this.p_marca,
        'p_modelo':this.p_modelo,  
        'p_anio':this.p_anio,
        'p_color':this.p_color,
        'p_tipo_combustible':this.p_tipo_combustible,
        'p_capacidad_pasajeros':this.p_capacidad_pasajeros
      },this.imagen
    );
    }
    await this.helper.showAlert("Vehiculo agregado Correctamente","");
    await this.router.navigateByUrl('inicio');
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
