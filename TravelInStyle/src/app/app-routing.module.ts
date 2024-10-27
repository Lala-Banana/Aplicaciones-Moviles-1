import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const RedireccionarLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path: 'home',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
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
    path: 'inicio/:usuario',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'viaje',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'lista-viajes',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/lista-viajes/lista-viajes.module').then( m => m.ListaViajesPageModule)
  },
  {
    path: 'agregar-vehiculo',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/agregar-vehiculo/agregar-vehiculo.module').then( m => m.AgregarVehiculoPageModule)
  },
  {
    path: 'listar-vehiculo',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/listar-vehiculo/listar-vehiculo.module').then( m => m.ListarVehiculoPageModule)
  },
  {
    path: 'perfil',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
