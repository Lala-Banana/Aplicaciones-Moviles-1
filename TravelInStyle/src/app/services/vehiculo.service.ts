import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  async agregarVehiculo(datoVehiculo:dataBodyVehiculo, imgFileUser:any){
    try{
    const formData = new FormData();

    formData.append('p_id_usuario',datoVehiculo.p_id_usuario?.toString());
    formData.append('p_patente',datoVehiculo.p_patente);
    formData.append('p_marca',datoVehiculo.p_marca);
    formData.append('p_modelo',datoVehiculo.p_modelo);  
    formData.append('p_anio',datoVehiculo.p_anio?.toString());
    formData.append('p_color',datoVehiculo.p_color);
    formData.append('p_tipo_combustible',datoVehiculo.p_tipo_combustible);
    //formData.append('p_capacidad_pasajeros',datoVehiculo.p_capacidad_pasajeros.toString());  

    if(datoVehiculo.token){
      formData.append('token',datoVehiculo.token);
    }
    formData.append('image', imgFileUser.file, imgFileUser.name);

    const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'vehiculo/agregar',formData));
    return response;
  }catch(error){
    throw error;
    }
  }
}

interface dataBodyVehiculo{
  p_id_usuario:number;
  p_patente:string;
  p_marca:string;
  p_modelo:string;
  p_anio:number;
  p_color:string;
  p_tipo_combustible:string;
  //p_capacidad_pasajeros:number;
  token?:string;
}
