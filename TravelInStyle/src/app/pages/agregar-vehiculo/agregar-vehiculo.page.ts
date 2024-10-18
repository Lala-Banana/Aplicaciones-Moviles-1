import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../listar-vehiculo/vehiculo';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  imagen : any;

  constructor() { }

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

  agregarVehiculo(){
    alert("Viaje agregado");
    console.log(this.vehiculo);
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
