import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, MenuController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { AuthServiceProvider } from '../../provider/auth.service';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import { UserModel } from '../../models/user.model';
import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  options: NativeTransitionOptions;
  loading: Loading;

  error: string;

  private loginData: FormGroup;
  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public authService: AuthServiceProvider,
    private nativePageTransitions: NativePageTransitions,
    public loadingCtrl: LoadingController) {

    this.loginData = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad() {
    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);
  }

  login() {
    this.createLoader();
    this.loading.present();
    //use this.loginData.value to authenticate the user
    this.authService.login(this.loginData.value)
      .subscribe(result => {
        console.log(result);
        this.redirectToHome()
      }, loginError => this.error = 'Username or password incorrect');
      this.loading.dismiss();
  }

  redirectToHome() {
      this.options = {
        duration:     500,
        iosdelay:     50,
        androiddelay: 100
      };
      
      this.nativePageTransitions.fade(this.options)
      this.navCtrl.setRoot(MenuPage);
  }

  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
        content: 'Chargement en cours...',
      });
  }

  register(){
    this.options = {
      duration:     500,
      iosdelay:     50,
      androiddelay: 100
    };
    
    this.nativePageTransitions.fade(this.options)
    this.navCtrl.push(RegisterPage);
  }

  openPage(page: string) {
    this.navCtrl.push(page);
  }
}


