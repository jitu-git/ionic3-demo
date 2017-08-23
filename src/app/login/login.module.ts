import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Login } from './login';
import { LoginSchema, LoginService } from  './login.service';
import {Logout} from "./logout.component";

@NgModule({
  imports: [IonicModule],
  declarations: [Login, Logout],
  entryComponents: [Login, Logout],
  providers:[ LoginSchema, LoginService]
})

export class LoginModule {}
