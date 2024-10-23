import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserModel } from 'src/app/models/usuario';
@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.page.html',
  styleUrls: ['./listar-vehiculo.page.scss'],
})
export class ListarVehiculoPage implements OnInit {
  vehiculos: Vehiculo[] = [];
  usuario:UserModel[]=[];
  usuarioId: number=0;

  constructor(private router: Router,
    private vehiculoService: VehiculoService,
    private storage: StorageService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuario();

    }
    agregarVehiculo(){
      this.router.navigate(['/agregar-vehiculo']);
    }
  
    async cargarVehiculos(){
      let dataStorage = await this.storage.obtenerStorage();
      const req = await this.vehiculoService.obtenerVehiculo(dataStorage[0].token);
      // Filtrar vehículos por el ID del usuario actual
    this.vehiculos = req.data.filter((vehiculo: Vehiculo) => vehiculo.id_usuario === this.usuarioId);
    }

    seleccionarVehiculo(parId:number){
      console.log("Vehiculo seleccionado ", parId);
      
    }

    async cargarUsuario(){
      let dataStorage = await this.storage.obtenerStorage();
      
      const req = await this.usuarioService.obtenerUsuario(
        {
          p_correo:dataStorage[0].usuario_correo,
          token:dataStorage[0].token
        }
      );
      this.usuario = req.data;
      console.log("DATA INICIO USUARIO ", this.usuario);
      if (this.usuario.length > 0) {
        this.usuarioId = this.usuario[0].id_usuario; // Asignar el ID del usuario actual
        console.log("ID del usuario actual: ", this.usuarioId);
  
        // Cargar los vehículos después de obtener el usuario
        this.cargarVehiculos();
    }
  }
}
