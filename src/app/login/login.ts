import { Component } from '@angular/core'
import {NavController, MenuController, Platform} from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { AppCommonService } from '../app.common.service'
import { LoginSchema, LoginService } from './login.service'
import { HomePage } from './../../pages/home/home'

@Component({
  selector : 'login-page',
  templateUrl : 'login.html'
})

export class Login {
  user: any;
  result: any;
  public userInfo: any;

  constructor(
    public navCtrl: NavController,
    public CS: AppCommonService,
    public LS: LoginSchema,
    public Menu: MenuController,
    private loginService: LoginService,
    private geolocation: Geolocation,
    private platform: Platform,
    private push: Push
  ){
    this.user = LS.schema;
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    const options: PushOptions = {
      android: {
        senderID: '726605641991'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((registration: any) => {
      this.loginService.deviceId = registration.registrationId;

      // get user information from local storage
      this.userInfo = localStorage.getItem("user");
      if(this.userInfo) {
        // get login detail from localstorage
        let loginInfo = localStorage.getItem("login_info");
        this.user = JSON.parse(loginInfo);
        //this.navCtrl.setRoot(HomePage);
        this.login(this);
      }

    });
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification');
      console.log(JSON.stringify(notification, null, 4));
    });

    pushObject.on('error').subscribe(error => {
      console.log('Error with Push plugin');
      console.log(JSON.stringify(error, null, 4));
    });

    /*this.user = LS.schema;
    // get user information from local storage
    this.userInfo = localStorage.getItem("user");
    if(this.userInfo) {
      // get login detail from localstorage
      let loginInfo = localStorage.getItem("login_info");
      this.user = JSON.parse(loginInfo);
      //this.navCtrl.setRoot(HomePage);
      this.login(this);
    }*/
  }

  ngOnInit() {

    this.Menu.swipeEnable(false);
  }


  /**
   * @method login
   * @desc Get values form login form and login
   * @param form
   */
  login(form) {
    // login in user
    this.loginService.login(form.user.useremail, form.user.password)
      .subscribe(res => {
        if(this.loginService.isLoggedIn){
          // save logged in user current location
          this.saveRiderLocation();
          // go to home page
          this.navCtrl.setRoot(HomePage);
        }
      });
  }

  /**
   * @method saveRiderLocation
   * @desc get rider location and save it into DB
   * @param none
   * @return none
   */
  saveRiderLocation() {
    this.platform.ready().then(() => {
      // get current location of rider at login time
      this.geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 5000}).then((resp) => {
        // save location
        this.loginService.saveRiderlatLong(resp.coords.latitude, resp.coords.longitude).subscribe();

      }).catch((error) => {
        console.log('Error getting location', JSON.stringify(error, null, 4));
      });

      // watch rider change his location
      this.geolocation.watchPosition()
        .filter((p) => p.coords !== undefined) //Filter Out Errors
        .subscribe(position => {
          // save location
          this.loginService.saveRiderlatLong(position.coords.latitude, position.coords.longitude).subscribe();
        });
    });
  }


}
