import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablecerContrasenaPage } from './reestablecer-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablecerContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablecerContrasenaPageRoutingModule {}
