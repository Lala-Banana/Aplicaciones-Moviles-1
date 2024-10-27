import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reestablecer-contrasena',
  templateUrl: './reestablecer-contrasena.page.html',
  styleUrls: ['./reestablecer-contrasena.page.scss'],
})
export class ReestablecerContrasenaPage implements OnInit {
  correo:string = "";
  constructor(private firebase:FirebaseService,
    private alertController: AlertController,
    private helper: HelperService
  ) { }

  ngOnInit() {
  }

  registro(){
    console.log('Correo:', this.correo);
    this.firebase.resetPassword(this.correo);
    this.helper.showAlert("Correo enviado","");
  }
}
