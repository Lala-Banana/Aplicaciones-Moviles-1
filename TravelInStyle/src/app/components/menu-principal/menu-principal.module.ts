import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuPrincipalComponent } from './menu-principal.component';

@NgModule({
  declarations: [MenuPrincipalComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuPrincipalComponent]
})
export class MenuPrincipalModule {}
