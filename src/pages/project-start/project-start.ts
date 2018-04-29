import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ProjectPage } from '../project/project';
import { ProfileServiceProvider } from '../../provider/profile.service';

import { ProjectBase } from '../../models/project.model';
import { Profile } from '../../models/user.model';
import { ProjectServiceProvider } from '../../provider/project.service';



@Component({
  selector: 'page-project-start',
  templateUrl: 'project-start.html',
})
export class ProjectStartPage{
  private projectBaseForm : FormGroup;
  project: ProjectBase;
  author: Profile;
  loading: Loading;
  user: string;
  obj: any;
  errors;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private profileService: ProfileServiceProvider,
    private projectService: ProjectServiceProvider, 
    private loadingCtrl: LoadingController, 
    private storage: Storage) 
  {
    this.storage.get('user').then(user => {
        this.user = user;
        this.getProfile(this.user);
      }
    );
    this.projectBaseForm = this.formBuilder.group({
      zone: new FormControl('', Validators.required),
      speculation: new FormControl('', Validators.required),
      surface: new FormControl('', Validators.required),
      surfaceAdvanced: new FormControl('',)
    });

    this.projectBaseForm.get('surface').valueChanges.subscribe(
      (surface:string) => {
        if (surface == '0') {
          this.projectBaseForm.get('surfaceAdvanced').setValidators([Validators.required]);
        }
        else if (surface == '1') {
          this.projectBaseForm.get('surfaceAdvanced').setValidators([Validators.nullValidator]);
        }
        else if (surface == '2') {
          this.projectBaseForm.get('surfaceAdvanced').setValidators([Validators.nullValidator]);
        }
        else if (surface == '3') {
          this.projectBaseForm.get('surfaceAdvanced').setValidators([Validators.nullValidator]);
        }
        else if (surface == '4') {
          this.projectBaseForm.get('surfaceAdvanced').setValidators([Validators.nullValidator]);
        }
        this.projectBaseForm.get('surfaceAdvanced').updateValueAndValidity();
      }
    );
  }

  addProForm(){
    if(this.projectBaseForm.value.surface === '0'){
      this.projectBaseForm.value.surface = this.projectBaseForm.value.surfaceAdvanced
    }
    console.log(this.projectBaseForm.value);

    let zone = this.projectBaseForm.value.zone;
    let product = this.projectBaseForm.value.speculation;
    let surface = this.projectBaseForm.value.surface
    let temp = parseInt(surface);

    console.log(typeof(temp));

    this.project = {
      author : this.author.id,
      zone : zone,
      product : product,
      surface : temp,
      created_at : new Date,
      update_at : new Date
    };

    console.log(this.project);
    this.postProject(this.project);
  }

  getProfile(user:string){
    this.createLoader();

    this.loading.present();
      this.profileService.getProfile(user).then(
        profileFetched => {
          this.author = profileFetched;
          console.log(this.author);
          this.loading.dismiss();
        },
    ); 
  }

  postProject(project: ProjectBase){
    this.createLoader();
    this.loading.present();

    this.projectService.postProject(project).subscribe(
      (result => {
        this.obj = result;
        console.log(this.obj);
        this.loading.dismiss();
        this.navCtrl.setRoot(ProjectPage);
      }
    ), addError => this.errors = addError);
  }

  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }

}