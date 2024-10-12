import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  async agregarUsuario(datoUsuario:dataBodyUsuario, imgFileUser:any){
    try{
    const formData = new FormData();

    formData.append('p_nombre',datoUsuario.p_nombre);
    formData.append('p_correo_electronico',datoUsuario.p_correo_electronico);
    formData.append('p_telefono',datoUsuario.p_telefono);
    if(datoUsuario.token){
      formData.append('token',datoUsuario.token);
    }
    formData.append('image_usuario', imgFileUser.file, imgFileUser.name);

    const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'user/agregar',formData));
    return response;
  }catch(error){
    throw error;
    }
  }
}

interface dataBodyUsuario{
  p_nombre:string;
  p_correo_electronico:string;
  p_telefono:string;
  token?:string;
}