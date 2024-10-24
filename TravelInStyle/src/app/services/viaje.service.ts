import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http: HttpClient) { }

  async agregarViaje(datoViaje:dataBodyViaje){
    try {
      const formData = new FormData();

      formData.append('p_id_usuario',datoViaje.p_id_usuario.toString());
      formData.append('p_ubicacion_origen',datoViaje.p_ubicacion_origen);
      formData.append('p_ubicacion_destino',datoViaje.p_ubicacion_destino);
      formData.append('p_costo',datoViaje.p_costo.toString());
      formData.append('P_id_vehiculo',datoViaje.P_id_vehiculo.toString());
      if(datoViaje.Token){
        formData.append('Token',datoViaje.Token);
      }
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar',formData));
      return response;
      
    } catch (error) {
      throw error;
    }
  }

  async obtenerViaje(parToken:string){
    try {
      const params = {
        token: parToken
      };
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/ obtener',{params}));
    } catch (error) {
      
    }
  }




}

interface dataBodyViaje{
  p_id_usuario :number;
  p_ubicacion_origen :string;
  p_ubicacion_destino:string;
  p_costo : number;
  P_id_vehiculo:number;
  Token:string;
}
