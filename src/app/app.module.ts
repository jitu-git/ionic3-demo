///<reference path="../pages/delivered/delivered.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from  '@angular/http'
import { LoginModule } from './login/login.module';
import { OrderInfoModule } from './../pages/order-details/order_info.module'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Push } from '@ionic-native/push';

// register all services
import { AppCommonService } from './app.common.service'
import { HomeService } from './../pages/home/home.service'
import {DeliveredOrders} from "../pages/delivered/delivered.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DeliveredOrders
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    LoginModule,
    OrderInfoModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DeliveredOrders
  ],
  providers: [
    StatusBar,
    SplashScreen, Geolocation, Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppCommonService, HomeService
  ]
})
export class AppModule {}
