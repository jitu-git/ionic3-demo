import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AppCommonService } from './../../app/app.common.service'
import { HomeService } from './home.service'
import { LoginService } from './../../app/login/login.service'
import {OrderInfo} from "../order-details/order_info.component";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public orders: Array<Object>;

  /**
   * @var wait
   * @desc For show a waiting message on listing page untill service can't get data from server
   * @type {boolean}
   */
  public wait:boolean = true;

  public page:number = 1;
  constructor(
    public navCtrl: NavController,
    private Menu: MenuController,
    private AppCommon: AppCommonService,
    public user: LoginService,
    public Home: HomeService
  ) {
    this.Menu.swipeEnable(true);

  }

  ngOnInit() {
    this.Home.back = false;
  }

  /**
   * @method ionViewDidEnter
   * @desc get orders listing on home page which not delivered yet
   */
  ionViewDidEnter() {
    // check home page content want to refresh or not.
    if(this.Home.back == false) {
      this.page = 1;
      this.AppCommon.show_loader();
      // get orders by home service
      this.Home.orders(this.user.userInfo.ID, this.page).subscribe((res)=> {
        this.AppCommon.hide_loader();
        let response = res.json();
        this.wait = false;
        this.orders = response.data;
      });
    }
    this.Home.back = true;

  }

  /**
   * @method HomeOrders
   * @desc Get orders list which not delivered yet // Only page scroll will call this function
   * @param scroll
   * @constructor
   */
  HomeOrders(scroll) {
    this.page++;
    this.AppCommon.show_loader();
    this.Home.orders(this.user.userInfo.ID, this.page).subscribe((res)=> {
      this.AppCommon.hide_loader();
      let response = res.json();
      for( var ord in response.data) {
        if (response.data.hasOwnProperty(ord)) {
          this.orders.push(response.data[ord]);
        }
      }
    });
  }


  /**
   * @method order_details
   * @desc get information of order
   * @param order_id
   */
  order_details(order_id) {
    this.navCtrl.push(OrderInfo, {
      order_id: order_id
    })
  }

}
