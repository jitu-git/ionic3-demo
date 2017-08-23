import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { AppCommonService } from './../app.common.service'

@Injectable()
export class LoginSchema {
  public schema = {
      'useremail' : '',
      'password' : ''
    }
}

@Injectable()
export class LoginService  {

  public isLoggedIn = false;
  public result:Object;
  public deviceId: string;

  /**
   * Logged in user info will save here
   */
  public userInfo: any;

  constructor(
    public CS: AppCommonService,
    public http: Http
  ){ }

  /**
   * @method login
   * @desc rider login
   * @param username
   * @param password
   * @returns {Observable<R>}
   */
  login(username, password) {
    let data = new URLSearchParams();
    data.append('useremail', username);
    data.append('password', password);
    data.append('deviceId', this.deviceId);

    this.CS.show_loader();
    return this.http.post(this.CS.base_url + 'rider_login', data)
      .map((res: Response) => {
        this.CS.hide_loader();
        let response = res.json();
        if(response.success == 1) {
          // save userinfo in local storage
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("login_info", JSON.stringify({ useremail:username, password: password }));
          this.userInfo = response.data;
          this.isLoggedIn = true;
        }else{
          this.CS.alertMessage("error",response.msg);
          this.isLoggedIn = false;
        }
      });
  }

  /**
   * @method saveRiderlatLong
   * @desc save rider's lat, long
   * @param lat
   * @param long
   * @returns {Observable<Response>}
   */
  saveRiderlatLong(lat, long){
    let data = new URLSearchParams();
    data.append('latitude', lat);
    data.append('logitude', long);
    data.append('userId', this.userInfo.ID);
    return this.http.post(this.CS.base_url + 'save_rider_lat_long', data);
  }

}
