import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = "";
  contrasena: string = '';
  constructor(private router: Router,
     private alertController: AlertController,
     private firebase:FirebaseService, 
     private helper:HelperService,
     private storage:StorageService
   ) { } 

  ngOnInit() {
  }


  async login() {
    if (this.usuario!='' && this.contrasena!='') {
      if (this.usuario=='1' && this.contrasena=='1') {
        this.router.navigateByUrl('/inicio/'+this.usuario);
      }else{
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no registrado',
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

  recuperarContrasena(){
    this.router.navigate(['/reestablecer-contrasena']);
  }

  registrarNuevoUsuario(){
    this.router.navigateByUrl('/registro-usuario');

  }
}
