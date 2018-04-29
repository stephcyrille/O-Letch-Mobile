import { Component } from "@angular/core";
import { NavController, Loading, LoadingController } from "ionic-angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../provider/auth.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UserModel } from '../../models/user.model';
import { MenuPage } from "../menu/menu";
import { CredentialsModel } from "../../models/credential.model";


@Component({
    selector: 'page-rgister',
    templateUrl: 'register.html',
})
export class RegisterPage{
  user: UserModel;
  options: NativeTransitionOptions;
  loading: Loading;
  errorPass;
  loginData: CredentialsModel;

  error: string;

  private signUpData: FormGroup;

  constructor(
      private navCtrl: NavController, 
      private loadingCtrl: LoadingController, 
      private formBuilder: FormBuilder,
      private nativePageTransition: NativePageTransitions,
      private authService: AuthServiceProvider,
      private toastCtrl: ToastController)
      {

        this.signUpData = this.formBuilder.group({
            username: new FormControl('', Validators.compose([Validators.maxLength(25), Validators.minLength(5),])),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirm_password: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });

      }

      register(){
          let password = this.signUpData.value.password;
          let confirm_password = this.signUpData.value.confirm_password;
          let username = this.signUpData.value.username
          let firstName = this.signUpData.value.firstName
          let lastName = this.signUpData.value.lastName
          let email = this.signUpData.value.email

          if(password === confirm_password){

            this.user = {
                username: username,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }

            this.loginData = {
                username: this.signUpData.value.username,
                password: this.signUpData.value.password
            };

            this.createLoader();
            this.loading.present();

            this.authService.register(this.user)
              .subscribe((result) => {
                    this.user = result;
                    console.log(this.user);
                    this.authService.login(this.loginData)
                      .subscribe((result) => {
                            console.log(result);
                            this.redirectToHome();
                        }, error => {console.log(error); }
                    );
                    this.loading.dismiss();
                }, error => {console.log(error); this.loading.dismiss();})
            console.log("Utilisateur cree avec succes!")
            // Call user registration service here
          } else {

            // this.errorPass = "Les mots de passe ne correspondent pas";

            let toast = this.toastCtrl.create({
                message: 'Les mots de passe ne coincide pas',
                duration: 3000,
                position: 'top'
              });
            
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
            
              toast.present();
          }
      }


      redirectToHome() {
        this.options = {
          duration:     500,
          iosdelay:     50,
          androiddelay: 100
        };
        
        this.nativePageTransition.fade(this.options)
        this.navCtrl.setRoot(MenuPage);
    }

    createLoader(){
        this.loading = this.loadingCtrl.create({
          spinner: 'circles',
            content: 'Chargement en cours...',
          });
      }


}