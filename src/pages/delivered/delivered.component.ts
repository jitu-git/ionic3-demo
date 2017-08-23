import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppCommonService } from './../../app/app.common.service'
import { LoginService } from './../../app/login/login.service'
import {HomeService} from "../home/home.service";



@Component({
  selector: 'page-home',
  templateUrl: 'delivered-orders.html'
})
export class DeliveredOrders {

  orders: Array<Object>;
  public wait: boolean = true;
  public page:number = 1;

  constructor(
    public navCtrl: NavController,
    private AppCommon: AppCommonService,
    public user: LoginService,
    public Home: HomeService
  ) {

  }

  ngOnInit() {
    //this.deliveredOrders();
    this.AppCommon.show_loader();
    this.Home.delivered_orders(this.user.userInfo.ID, this.page).subscribe((res)=> {
      this.AppCommon.hide_loader();
      let response = res.json();
      this.wait = false;
      this.orders = (response.data);
      // this.orders = this.Home.orders_data;
      this.page++;
    });
  }

  deliveredOrders(scroll){
    this.AppCommon.show_loader();
    this.Home.delivered_orders(this.user.userInfo.ID, this.page).subscribe((res)=> {
      this.AppCommon.hide_loader();
      let response = res.json();
      for( var ord in response.data) {
        if (response.data.hasOwnProperty(ord)) {
          this.orders.push(response.data[ord]);
        }
      }
      this.page++;
    });
  }

}
