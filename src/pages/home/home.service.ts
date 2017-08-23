import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/Rx'


import { AppCommonService } from './../../app/app.common.service'

@Injectable()
export class HomeService {
  public back:boolean = false;
  public orders_data: Array<Object>;

  constructor(
    public http: Http,
    public CS: AppCommonService
  ){  }


  /**
   * @method orders
   * @desc get all orders of logged in user.
   * @param number user_id
   * @param number page
   * @returns {Observable<Response>}
   */
  orders(user_id, page) {
    let data = new URLSearchParams();
    data.append('loggedUserId', user_id);
    data.append('perpage', '4');
    data.append('page', page);
    return this.http.post(this.CS.base_url + 'rider_orders', data);
  }

  /**
   * @method delivered_orders
   * @desc get all delivered orders of logged in user.
   * @param user_id
   * @returns {Observable<Response>}
   */
  delivered_orders(user_id, page) {
    let data = new URLSearchParams();
    data.append('loggedUserId', user_id);
    data.append('perpage', '4');
    data.append('page', page);
    return this.http.post(this.CS.base_url + 'rider_orders_deliver', data);
  }

}
