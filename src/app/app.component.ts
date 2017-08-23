import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// all components
import { HomePage } from '../pages/home/home';
import { Login } from './login/login';
import { LoginService } from './login/login.service';
import {Logout} from "./login/logout.component";
import {DeliveredOrders} from "../pages/delivered/delivered.component";

enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  session : any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private loginService: LoginService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Delivered', component: DeliveredOrders },
      { title: 'Logout', component: Logout },

    ];
  }

  ngOnInit() {
    if (!this.loginService.isLoggedIn) {
      this.rootPage = Login;
    }else{
      this.rootPage = HomePage;
    }
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
