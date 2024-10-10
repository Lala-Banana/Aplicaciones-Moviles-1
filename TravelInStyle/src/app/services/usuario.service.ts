import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  async agregarUsuario(datoUsuario:dataBodyUsuario){
    const formData = new FormData();

    formData.append('p_nombre',datoUsuario.p_nombre);
    formData.append('p_correo_electronico',datoUsuario.p_correo_electronico);
    formData.append('p_telefono',datoUsuario.p_telefono);
    if(datoUsuario.token){
      formData.append('token',datoUsuario.token);
    }
    //formData.append('image_usuario')
  }


}

interface dataBodyUsuario{
  p_nombre:string;
  p_correo_electronico:string;
  p_telefono:string;
  token?:string;
}