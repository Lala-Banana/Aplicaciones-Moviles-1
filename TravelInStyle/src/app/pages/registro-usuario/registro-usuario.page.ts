import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router:Router , private alertController: AlertController) { }

  ngOnInit() {
  }
  
  cancelar() {
    // Navegar a la página anterior o realizar otra acción
    this.router.navigate(['/login']);
  }

  async enviar() {
    if (this.areFieldsComplete()) {
      if (this.contrasena === this.confirmarContrasena) {
        // Muestra la alerta de éxito
        const alert = await this.alertController.create({
          header: 'Usuario creado',
          buttons: ['OK']
        });
        await alert.present();
        
        // Navega a la página de login después de la alerta
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
}
