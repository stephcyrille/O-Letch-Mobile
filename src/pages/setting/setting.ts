import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../provider/auth.service';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage{

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
