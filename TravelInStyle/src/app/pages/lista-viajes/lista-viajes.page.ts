import { Component, OnInit } from '@angular/core';
import { Viaje } from './viaje'; // Asegúrate de que Viaje esté correctamente definido
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
import { HelperService } from 'src/app/services/helper.service';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserModel } from 'src/app/models/usuario';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.page.html',
  styleUrls: ['./lista-viajes.page.scss'],
})
export class ListaViajesPage implements OnInit {
  public loaded = false;
  viajes: Viaje[] = [];
  public nuevoViaje: string = '';
  usuarioId: number=0;
  estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'En curso' },
    { id: 3, nombre: 'Completado' },
  ];
  viajeSeleccionado : number | null = 0;
  nuevoEstado : number | null = null;




  
  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private alertController: AlertController, 
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.cargarViajes(); 
  }

  agregarViaje() {
    this.router.navigate(['/viaje']);
  }

  async cargarViajes() {
    this.loaded = false; 
    await this.cargarUsuario();
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.viajeService.obtenerViaje(dataStorage[0].token);
      console.log('storage y obtenerViaje Funcionan',req);
      
      this.viajes = req.data.filter((viaje: Viaje) => viaje.id_usuario === this.usuarioId);
      console.log(this.viajes);
      if (!this.viajes || this.viajes.length == 0){
        this.helperService.showAlert('No presenta viajes', 'Estado:');
      }
      
    } finally {
      this.loaded = true; 
    }
  }
  usuario:UserModel[]=[];
  async cargarUsuario() {
    try {
        let dataStorage = await this.storage.obtenerStorage();
        console.log('dataStorage', dataStorage);
        const req = await this.usuarioService.obtenerUsuario({
            p_correo: dataStorage[0].usuario_correo,
            token: dataStorage[0].token
        });
        this.usuario = req.data;
        console.log("DATA INICIO USUARIO ", this.usuario);
        
        if (this.usuario.length > 0) {
            this.usuarioId = this.usuario[0].id_usuario; // Asignar el ID del usuario actual
            console.log("ID del usuario actual: ", this.usuarioId);
            
            // Cargar los vehículos y esperar a que se complete
             // Usar await aquí
        }
    } catch (error) {
        console.error('Error al cargar el usuario', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
}




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
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  
/*  */

onViajeChange() {
  console.log(' nuevoEstado', this.nuevoEstado);
}

// Método para cerrar el moda

// Método para actualizar el estado del viaje
async actualizarEstado() {
  try {
    

    let dataStorage = await this.storage.obtenerStorage();
    if(this.nuevoEstado !== null && (this.viajeSeleccionado !== null)){
      if(typeof this.nuevoEstado === 'number' && (typeof this.viajeSeleccionado !== 'number')){
      this.helperService.showAlert('Estado actualizado', '');
      console.log('this.nuevoEstado',this.nuevoEstado, 'this.viajeSeleccionado.id',this.viajeSeleccionado);
      console.log('dataStorage[0].token',dataStorage[0].token);
       await this.viajeService.actualizarEstadoViaje({
        id_estado: this.nuevoEstado,
        id_viaje: this.viajeSeleccionado,
        token: dataStorage[0].token, // Aquí incluye tu token de autenticación
      }); 
      }else{
        console.log('Tipo de dato no corresponde');
      }
    

    } else {
      console.log('Uno de estos valores es null: this.nuevoEstado | this.viajeSeleccionado');
    }
    
  } catch (error) {
    console.error('Error al actualizar el estado del viaje', error);
  }

  }


  obtenerEstadoTexto(idEstado: number): string {
    const estado = this.estados.find(e => e.id === idEstado);
    return estado ? estado.nombre : 'Desconocido';
  }




}
