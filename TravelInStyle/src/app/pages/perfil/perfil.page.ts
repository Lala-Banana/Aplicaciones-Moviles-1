import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: string = '';
  correo: string = '';
  telefono: string = '';
  imagen: string = '';


  constructor(
    private storage: StorageService,
    private usuarioService: UsuarioService
  ) { }

  async ngOnInit() {
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
        this.correo = usuarioInfo.data[0].correo_electronico || 'lala@banana.cl';
        this.telefono = usuarioInfo.data[0].telefono || '123456';
        this.imagen = usuarioInfo.data[0].imagen_usuario || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuJu_ReyyRnFVRhMgEWnuQdDNlTs0Om50LQ&s'
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }




  }

}
