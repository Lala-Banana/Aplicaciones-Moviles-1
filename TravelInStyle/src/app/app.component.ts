import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private alertController: AlertController) {}

  goToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Método para cerrar sesión con confirmación
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
            // Aquí va la lógica de cerrar sesión
            console.log('Cerrando sesión...');
            this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
          }
        }
      ]
    });

    await alert.present();
  }
}
