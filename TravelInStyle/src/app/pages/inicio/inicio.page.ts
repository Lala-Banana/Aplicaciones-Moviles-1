import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController, IonCard } from '@ionic/angular';
import { ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  usuario: string = '';
  private animation: any;
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private helper: HelperService,
    private firebase: FirebaseService
  ) { }

  async ngOnInit() {
    // Obtener el parámetro de usuario de la URL
    //this.usuario = this.activateRoute.snapshot.params["usuario"];
    
    // Ahora del token jeje
    try {
      // Obtener el token almacenado
      const tokenData = await this.storage.obtenerStorage();
      console.log("TokenData");
      console.log(tokenData);

      if (tokenData && tokenData[0].token && tokenData[0].usuario_correo) {
        const usuarioInfo = await this.usuarioService.obtenerUsuario({
          p_correo: tokenData[0].usuario_correo,
          token: tokenData[0].token
        });

        this.usuario = usuarioInfo.data[0].nombre || 'Usuario';
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  }

  ionViewWillEnter(): void {
    console.log("ionViewWillEnter - La página está a punto de entrar en vista.");
  }

  ionViewDidEnter(): void {
    console.log("ionViewDidEnter - La página ha entrado completamente en vista.");
    // Inicializar la animación 
    if (this.card) {
      this.animation = this.animationCtrl
        .create()
        .addElement(this.card.nativeElement)
        .duration(1500)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('opacity', '1', '0.5');
    }
  }

  ionViewWillLeave(): void {
    console.log("ionViewWillLeave - La página está a punto de salir de la vista.");
  }

  ionViewDidLeave(): void {
    console.log("ionViewDidLeave - La página ha salido de la vista.");
  }

  // Navegacion
  goToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Cierre de sesion
  async logout() {
    const confirmar = await this.helper.showConfirm("¿Está seguro de cerrar sesión?");
    if(confirmar){
      this.firebase.logout();
      this.router.navigateByUrl('/login');
    }
  }

  play() {
    if (this.animation) {
      this.animation.play();
      console.log('Animación iniciada');
    }
  }

  pause() {
    if (this.animation) {
      this.animation.pause();
      console.log('Animación pausada');
    }
  }

  stop() {
    if (this.animation) {
      this.animation.stop();
      console.log('Animación detenida');
    }
  }
}
