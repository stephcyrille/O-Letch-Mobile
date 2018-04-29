import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';

import { NavController, 
         Loading, 
         NavParams, 
         ToastController, 
         LoadingController, 
         AlertController  
        } from 'ionic-angular';

// Native Plugin 
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { Crop } from '@ionic-native/crop';

import { Profile, ProfilePost } from '../../models/user.model';
import { ProfileServiceProvider } from '../../provider/profile.service';
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class EditProfilePage{
  postProfile: ProfilePost;
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
              private formBuilder: FormBuilder,
              public camera: Camera,
              public crop: Crop,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              // Service
              public http: Http
              ) 
  {
    // Profile form builder here
    this.profileForm = this.formBuilder.group({
      age: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });

    this.profile = navParams.data.profile;

    this.profileForm.setValue({
      age: this.profile.age,
      profession: this.profile.profession,
      phone: this.profile.phone,
      country: this.profile.country,
      city: this.profile.city
    })
    console.log(this.profile);
  }


  uploadImage(){
    let user = this.profile.user.username
    let url = `https://mebenga.pythonanywhere.com/api/profiles/${user}/avatar/`;
    let postData = new FormData();
    
    postData.append('avatar', this.imageURI);

    let data: Observable<any> = this.http.post(url, postData);
    
    this.createLoader();
    this.loading.present();
    
    data.subscribe((result) => {
      // alert(result);
      console.log(result);
      this.loading.dismiss();
      // this.navCtrl.push(ProfilePage);
      this.navCtrl.remove(this.navCtrl.last().index)
        .then(() => {
            this.navCtrl.push(ProfilePage)
        })
        .catch(error => { 
          console.log(error); 
        }
      );
    }, err => {alert(err); this.loading.dismiss()});
    
  }

  updateProfile(){
    let user = this.profile.user.username

    this.postProfile = {
      age: this.profileForm.value.age,
      profession: this.profileForm.value.profession,
      phone: this.profileForm.value.phone,
      city: this.profileForm.value.city,
      country: this.profileForm.value.country,
    };
    console.log(this.postProfile)

    this.createLoader();
    this.loading.present();

    this.profileService.postProfile(this.postProfile, user).subscribe((result) =>{
      this.loading.dismiss();
      this.navCtrl.pop();
    }, err => {console.log(err); this.loading.dismiss()})

  }


  getProfile(user:string){
      this.profileService.getProfile(user).then(
        profileFetched => {
            this.profile = profileFetched;
            console.log(this.profile);
          },
        )
        .catch( (error) => {
            console.log(error + "Cet utilisateur ne possede pas encore de profil");
          } 
        ); 
  }



  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter votre nouvelle PP',
      buttons: [
        {
          text: 'Récupérer dans la gallerie',
          handler: () => {
            this.getGalPicture();
          }
        },
        {
          text: 'Prendre une photo',
          handler: () => {
            this.getAppPicture();
          }
        }
      ],
      cssClass: 'promptCustomCss'
    });
    prompt.present();
  }

  getAppPicture(){
    this.createLoader();
    this.loading.present();

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      targetWidth: 200
    };

    this.camera.getPicture(options).then((imageData) => {
        this.imageURI = 'data:image/jpeg;base64,' + imageData;
        this.loading.dismiss();
      }, 
      (err) => {
        this.loading.dismiss();
        console.log(err);
        this.presentToast(err);
      }
    ); 

  }


  getGalPicture(){
    this.createLoader();
    this.loading.present();

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight: 200,
      targetWidth: 200
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.imageURI = 'data:image/jpeg;base64,' + imageData;
        this.loading.dismiss();
      }, 
      (err) => {
        this.loading.dismiss();
        console.log(err);
        this.presentToast(err);
      }
    ); 

    // this.cropPicture(this.imageURI);
  }


  cropPicture(){
    let options = {
      quality: 100,
      targetHeight: 150,
      targetWidth: 150
    }

    this.crop.crop(this.imageURI, options)
    .then(newImageUrl => {
      this.imageURI = newImageUrl
    }
    , err => {console.log(err), alert("Error" + err)})
  }

  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
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
