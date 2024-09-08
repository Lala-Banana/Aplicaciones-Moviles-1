import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./pages/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'reestablecer-contrasena',
    loadChildren: () => import('./pages/reestablecer-contrasena/reestablecer-contrasena.module').then( m => m.ReestablecerContrasenaPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'lista-viajes',
    loadChildren: () => import('./pages/lista-viajes/lista-viajes.module').then( m => m.ListaViajesPageModule)
  },
  {
    path: 'agregar-vehiculo',
    loadChildren: () => import('./pages/agregar-vehiculo/agregar-vehiculo.module').then( m => m.AgregarVehiculoPageModule)
  },
  {
    path: 'listar-vehiculo',
    loadChildren: () => import('./pages/listar-vehiculo/listar-vehiculo.module').then( m => m.ListarVehiculoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
