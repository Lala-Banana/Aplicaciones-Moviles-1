import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  imagen : any;
  

  constructor(private router:Router , private alertController: AlertController,
    private firebase:FirebaseService, 
    private UsuarioService:UsuarioService,
    private helper:HelperService,
  ) { }

  ngOnInit() {
  }
  
  cancelar() {
    this.router.navigate(['/login']);
  }

  async enviar() {
    if (this.areFieldsComplete()) {
      if (this.contrasena === this.confirmarContrasena) {
        const alert = await this.alertController.create({
          header: 'Usuario creado',
          buttons: ['OK']
        });
        await alert.present();

        this.router.navigate(['/login']);
      } else {
        // Muestra la alerta si las contraseñas no coinciden
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Las contraseñas no coinciden',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      // Muestra la alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Falta completar campos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  areFieldsComplete(): boolean {
    // Verifica que todos los campos tengan un valor no vacío
    return !!(this.nombre && this.correo && this.telefono && this.direccion && this.contrasena && this.confirmarContrasena);
  }

  async registro(){
    const userFireBase = await this.firebase.registro(this.correo,this.contrasena);
    const token = await userFireBase.user?.getIdToken();
    if (token){
      const req = await this.UsuarioService.agregarUsuario({
        p_correo_electronico:this.correo,
        p_nombre:this.nombre,
        p_telefono:this.telefono,
        token:token
      },this.imagen
    );
    }
    await this.helper.showAlert("Usuario agregado Correctamente","");
    await this.router.navigateByUrl('login');
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
