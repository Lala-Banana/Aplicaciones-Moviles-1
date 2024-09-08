import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

   // Método para navegar a una página
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
