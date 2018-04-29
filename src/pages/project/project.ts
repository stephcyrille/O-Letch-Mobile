import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProjectStartPage } from '../project-start/project-start';
import { Project } from '../../models/project.model';
import { ProjectServiceProvider } from '../../provider/project.service';



@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage{
  project: Array<Project>;
  loading: Loading;
  user: string;
  errorMessage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage, 
    private loadingCtrl: LoadingController,
    private projectService: ProjectServiceProvider) 
  {
    this.storage.get('user').then(user => {
      this.user = user;

      this.createLoader();
      this.loading.present();

      this.projectService.getProject(this.user).subscribe(
        result => {
          this.project = result;
          console.log(this.project);
          this.loading.dismiss();
        }, error => {
          console.log(this.project);
          this.errorMessage = 'Auccun projet detecte!'; 
          this.loading.dismiss(); 
          console.log(this.errorMessage)
        }
      )
    }
  );
  }


  startProject(){
    this.navCtrl.push(ProjectStartPage);
  }

  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }

}
