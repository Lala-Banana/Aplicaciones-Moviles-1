import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarVehiculoPageRoutingModule } from './listar-vehiculo-routing.module';

import { ListarVehiculoPage } from './listar-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarVehiculoPageRoutingModule
  ],
  declarations: [ListarVehiculoPage]
})
export class ListarVehiculoPageModule {}
