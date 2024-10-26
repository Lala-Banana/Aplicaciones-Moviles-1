import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService:AlertController,
              private loaderController:LoadingController,
              private toastController: ToastController
  ) { }


  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create(
      {
        cssClass:"",
        message:msg,
        header:title,
        buttons:['Aceptar']
      }
    )
    await alert.present();
    return alert;
  }


  async showLoader(msg:string){
    var loader = await this.loaderController.create(
      {
        message:msg,
        translucent:true
      }
    )
    await loader.present();
    return loader;
  }

  async showToast(msg:string){
    const toast = await this.toastController.create({
     message:msg,
     duration:3000,
     position: 'top',
     icon:'checkmark-outline'
    })
    await toast.present();
   }

}
