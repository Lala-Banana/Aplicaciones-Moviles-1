import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, 
    private router: Router,
     private alertController: AlertController,
     private firebase:FirebaseService) {}

   // Navegacion
   goToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Cierre de sesion
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Cerrando sesión...');
            this.menu.close();
            this.firebase.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
