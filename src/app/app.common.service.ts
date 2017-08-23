import { Injectable } from '@angular/core'
import { ToastController, LoadingController } from 'ionic-angular'


@Injectable()
export class AppCommonService {

  public base_url = 'http://syonserver.com/megagas/?actions=';
  public loader: any;

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController){

  }

  getData(data:string){
   // return this['data'];
  }

  alertMessage(type, message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      //cssClass: type == 'error' ? 'error-toast' : ""
    });
    toast.present();
  }

  show_loader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  hide_loader() {
    this.loader.dismiss();
  }
}
