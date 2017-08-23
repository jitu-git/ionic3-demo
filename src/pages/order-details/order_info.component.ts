import { Component } from '@angular/core'
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';

import { AppCommonService } from './../../app/app.common.service'
import { OrderInfoService } from  './order_info.service'
import {HomeService} from "../home/home.service";

@Component({
  selector: 'order-info',
  templateUrl: 'order_info.html'
})

export class OrderInfo {
  public order: any;
  public orderDataAvail:boolean = false;
  public orderId: number;

  constructor(
    public Nav: NavController,
    public Order: OrderInfoService,
    public CS: AppCommonService,
    public NavParams: NavParams,
    public alertCtrl: AlertController,
    public Home: HomeService,
    public iAb: InAppBrowser,
    private geolocation: Geolocation,
    private platform: Platform
  ){
    this.orderId = this.NavParams.get('order_id');

  }

  ngOnInit() {
    if(!this.order) {
      this.Order.order_info(this.orderId).subscribe((res)=> {
        this.CS.hide_loader();
        let response = res.json();
        this.order = response.data;
        this.orderDataAvail = true;
      });
    }

  }

  /**
   * @method openMap
   * @desc open native google map application with navigation of user and deliver location
   * @param object map_address
   */
  openMap(map_address) {
    this.platform.ready().then(() => {
      // get current location of rider
      alert("Opening map");
      this.geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 5000}).then((resp) => {
        window.open('google.navigation:q='+map_address.lat+','+map_address.lng +'&mode=b', '_system');
      }).catch((error) => {
        alert("Error in opening map" + JSON.stringify(error, null, 4));
        console.log('Error getting location', JSON.stringify(error, null, 4));
      });
    });
  }

  /**
   * @method delivered
   * @desc Set order is delivered
   * @param order_id
   */
  delivered(order_id) {
    // a confirmation  popup before order complete
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure that order has been delivered ?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Ok',
          handler: () => {
            // update order status to delivered
            this.Order.complete_order(this.orderId).subscribe((res)=> {
              this.CS.hide_loader();
              let response = res.json();
              if(response.success == 1){
                this.CS.alertMessage("success",response.msg );
                // back to home page with refresh status
                this.Home.back = false;
                this.Nav.pop();

              }else{
                this.CS.alertMessage("error", response.msg);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
