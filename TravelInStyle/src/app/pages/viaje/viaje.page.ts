import { Viaje } from './../lista-viajes/viaje';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculo } from '../listar-vehiculo/vehiculo';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private alertController: AlertController,
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private viajeService: ViajeService,
    private router: Router,
    private helper: HelperService,
    private vehiculoService: VehiculoService,
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    
     this.cargarVehiculos(); 
  }
  usuarioId: number=0;
  nuevoViaje: Viaje = {
    id_usuario: 0,           // Proporciona un valor válido
    id_estado: 0,            // Proporciona un valor válido
    nombre_proyecto: '',     // Proporciona un valor válido
    patente: '',             // Proporciona un valor válido
    costo: 0,
    fecha: '',
    ubicacion_origen: '',
    ubicacion_destino: '',
    id_vehiculo: 0,
    marca: '',               // Proporciona un valor válido
    modelo: '',              // Proporciona un valor válido
    anio: 0,                 // Proporciona un valor válido
    color: ''                // Proporciona un valor válido
};

  vehiculos: Vehiculo[] = []; // Aquí almacenaremos los vehículos del usuario
  
  idVehiculo: number =0;

  token: string=" ";
  usuario:UserModel[]=[];
  vehiculoSeleccionado: number | null = null;


  onVehiculoChange() {
    console.log('Vehículo seleccionado:', this.vehiculoSeleccionado);
  }
  async agregarViaje(){
    console.log("this.vehiculoSeleccionado antes del primer if", this.vehiculoSeleccionado);
    if (this.vehiculoSeleccionado !== null){
      // Obtener el token almacenado
      console.log("this.vehiculoSeleccionado antes de TRY", this.vehiculoSeleccionado);
      let tokenData = await this.storage.obtenerStorage();
      console.log("TokenDataaa", tokenData);
      const token = tokenData[0].token
      try {
        if(token){
          console.log("TokenDataaa", tokenData);
          
          console.log("this.vehiculoSeleccionado antes del showalert", this.vehiculoSeleccionado);
          if(this.vehiculoSeleccionado == null){
            await this.helper.showAlert("Debe agregar un vehiculo","");
          }else{
            console.log('tokenData.data[0].id_usuario',this.usuarioId,
              'this.vehiculoSeleccionado',this.vehiculoSeleccionado,
            '');
            try{
            
            const req = await this.viajeService.agregarViaje({
              p_id_usuario: this.usuarioId,
              p_id_vehiculo: this.vehiculoSeleccionado, 
              p_costo: this.nuevoViaje.costo,
              p_ubicacion_origen: this.nuevoViaje.ubicacion_origen,
              p_ubicacion_destino: this.nuevoViaje.ubicacion_destino,
              token: token,
            });

            await this.helper.showToast('Viaje Agregado! :)')
            await this.router.navigateByUrl('/lista-viajes');
            } catch(error){
              console.error('Error al ejecutar: this.viajeService.agregarViaje',error)
              this.helper.showAlert("No se pudo agregar el viaje", "Llame a diosito");
            }
            //await this.helper.showAlert("Viaje agregado Correctamente","");
            
            }
          
        }
      } catch (error) {
      console.error('Error al obtener la informacion',error)
      }
    } else{
      this.helper.showAlert("Debe agregar un vehiculo","");

    }

  }
  
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

async cargarVehiculos() {
    try {
        await this.cargarUsuario();
        let dataStorage = await this.storage.obtenerStorage();
        const req = await this.vehiculoService.obtenerVehiculo(dataStorage[0].token);
        // Filtrar vehículos por el ID del usuario actual
        console.log('req', req);
        console.log('this.usuarioId', this.usuarioId);

        this.vehiculos = req.data.filter((vehiculo: Vehiculo) => vehiculo.id_usuario === this.usuarioId);
    } catch (error) {
        console.error('Error al cargar vehículos', error);
        // Manejo de errores específico para cargar vehículos
    }
}




}