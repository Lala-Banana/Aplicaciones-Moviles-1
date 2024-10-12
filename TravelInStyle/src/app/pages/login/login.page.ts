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
  usuario: string = "usuario@gmail.com";
  contrasena: string = '123456';
  constructor(private router: Router,
     private alertController: AlertController,
     private firebase:FirebaseService, 
     private helper:HelperService,
     private storage:StorageService
   ) { } 

  ngOnInit() {
  }

  async login(){
  
    if (this.usuario == "") {
      this.helper.showAlert("Ingrese el correo", "Error de validación");
      return;
    }
    if (this.contrasena == "") {
      this.helper.showAlert("Ingrese la contraseña", "Error de validación");
      return;
    }

    const loader = await this.helper.showLoader("Cargando");
    try {

      await this.firebase.login(this.usuario,this.contrasena);
      loader.dismiss();
      this.router.navigateByUrl('/inicio/'+this.usuario);
    } catch (error:any) {
      
      let msg = "Ocurrió un error al iniciar sesión.";
      
      if(error.code == "auth/invalid-credential1"){
        msg = "Credenciales incorrectas.";
      }else if(error.code == "auth/wrong-password1"){
        msg = "Contraseña incorrecta.";
      }else if(error.code == "auth/invalid-email1"){
        msg = "Correo no valido.";
      }


      this.helper.showAlert(msg,"Aceptar");
      loader.dismiss();
    }

    const jsonToken = 
    [
      {
        "token":"123BravoVillarroel123",
        "nombre":"PGY4121BV"
      }
    ];
    
    this.storage.agregarToken(jsonToken);

    //Obtenemos la info que guardamos en storage
    let token = await this.storage.obtenerStorage();
    console.log(token[0].nombre);
  }

  recuperarContrasena(){
    this.router.navigate(['/reestablecer-contrasena']);
  }

  registrarNuevoUsuario(){
    this.router.navigateByUrl('/registro-usuario');

  }
}
