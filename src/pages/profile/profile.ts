import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { NavController, Loading, NavParams, ToastController, LoadingController } from 'ionic-angular';

// Native Plugin 
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { Storage } from '@ionic/storage';


import { Profile } from '../../models/user.model';
import { ProfileServiceProvider } from '../../provider/profile.service';
import { EditProfilePage } from '../profile-edit/profile-edit';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage{
  profile: Profile;
  loading: Loading;
  public user:string;
  private profileForm : FormGroup;


  
  // For image Ops
  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private profileService: ProfileServiceProvider, 
              private storage: Storage,
              private formBuilder: FormBuilder,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) 
  { }

  ionViewDidEnter(){
    this.storage.get('user').then(user => {
      this.user = user;
      this.getProfile(this.user);
    });


    // Profile form builder here
    this.profileForm = this.formBuilder.group({
      age: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });
  }

  doRefresh(refresher){
    this.storage.get('user').then(user => {
      this.user = user;
      this.getProfile(this.user);
    });
    if(refresher != 0){
      refresher.complete();
    }
  }

  getProfile(user:string){
    this.createLoader();

    this.loading.present();
      this.profileService.getProfile(user).then(
        profileFetched => {
            this.profile = profileFetched;
            console.log(this.profile);
            
              this.loading.dismiss();
          },
        )
        .catch( (error) => {
            console.log(error + "Cet utilisateur ne possede pas encore de profil");
            this.loading.dismiss();
          } 
        ); 
  }

  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }


  uploadImage(){
    
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: this.user,
      fileName: this.user,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    
    fileTransfer.upload(this.imageURI, 'http://mebenga.pythonanywhere.com/api/profiles/avatars/', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
    

  }

  getPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.imageURI = imageData;
        this.getProfile(this.user);
      }, 
      (err) => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage, {profile: this.profile})
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
