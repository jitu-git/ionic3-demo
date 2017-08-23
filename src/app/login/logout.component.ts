import { Component } from '@angular/core'
import {NavController} from 'ionic-angular'


import {Login} from "./login";

@Component({
  selector : 'logout-page',
  template : "<p>Logout...</p>"
})

export class Logout {

  constructor(private Nav: NavController){
    localStorage.setItem("user", '');
    localStorage.setItem("login_info", '');
    this.Nav.setRoot(Login);
  }
}
