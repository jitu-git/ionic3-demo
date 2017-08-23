import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/Rx'


import { AppCommonService } from './../../app/app.common.service'

@Injectable()
export class OrderInfoService {

  constructor(
    public http: Http,
    public CS: AppCommonService
  ){  }



  /**
   * @method order_info
   * @desc get information of order
   * @param order_id | int
   * @returns {Observable<Response>}
   */
  order_info(order_id) {
    let data = new URLSearchParams();
    data.append('orderId', order_id);
    this.CS.show_loader();
    return this.http.post(this.CS.base_url + 'rider_orders_details', data);
  }

  /**
   * @method complete_order
   * @desc change order status to delivered
   * @param order_id
   * @returns {Observable<Response>}
   */

  complete_order(order_id) {
    let data = new URLSearchParams();
    data.append('orderId', order_id);
    this.CS.show_loader();
    return this.http.post(this.CS.base_url + 'delivered_booking', data);
  }
}
