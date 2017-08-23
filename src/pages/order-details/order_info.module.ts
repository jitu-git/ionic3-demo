import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { OrderInfo } from './order_info.component'
import { OrderInfoService  } from './order_info.service'

@NgModule({
  imports: [IonicModule],
  declarations: [OrderInfo],
  entryComponents: [OrderInfo],
  providers: [OrderInfoService, InAppBrowser],
  exports: [OrderInfo]
})

export class OrderInfoModule {}
