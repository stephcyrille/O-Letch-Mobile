import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Loading, LoadingController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { QuestionPost, Question } from '../../models/question.model';
import { Profile } from '../../models/user.model';
import { ProfileServiceProvider } from '../../provider/profile.service';
import { QuestionServiceProvider } from '../../provider/questions.service';
import { QuestionSinglePage } from '../question-single/question-single';



@Component({
  selector: 'page-add-question',
  templateUrl: 'add-question.html',
})
export class AddQuestionPage {
  questionEnvoyee: Question;
  question: QuestionPost;
  loading: Loading;
  private questionDataForm: FormGroup;
  author: Profile;
  user: string;
  obj: any;
  errors

  constructor(
      private navCtrl:NavController , 
      private loadingCtrl: LoadingController, 
      private formBuilder: FormBuilder,
      private storage: Storage,
      private profileService: ProfileServiceProvider,
      private questionService:QuestionServiceProvider)
  {
    this.storage.get('user').then(user => {
        this.user = user;
        this.getProfile(this.user);
      }
    );
    this.questionDataForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.maxLength(50),])),
      content: new FormControl('', Validators.compose([Validators.maxLength(150),])),
    });
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
    ).catch(error => { 
        console.log(error); 
        this.loading.dismiss(); 
      }
    ); 
  }

  submitQuestion(){

    console.log(this.questionDataForm.value);

    let title = this.questionDataForm.value.title;
    let content = this.questionDataForm.value.content;

    this.question = {
      author: this.author.id,
      title: title,
      content: content,
      vote : 0,
      toggle: true,
      created_at: new Date,
    }

    this.postQuestion(this.question);
  }


  postQuestion(question: QuestionPost){
    this.createLoader();
    this.loading.present();

    this.questionService.postQuestions(question)
      .subscribe((result) => {
          this.obj = result;
          console.log(this.obj)
          this.loading.dismiss()
          this.questionService.getSingleQuestion(this.obj.id)
            .then((result) =>{
              this.questionEnvoyee = result;
                this.navCtrl.remove(this.navCtrl.last().index)
                  .then(() => {
                      this.navCtrl.push(QuestionSinglePage, {question:this.questionEnvoyee})
                  })
                  .catch(error => { 
                    console.log(error); 
                    this.loading.dismiss(); 
                  }
                );
              }
            )
            .catch(error => { 
              console.log(error); }
            );
        }, addError => this.errors = addError )
  }


  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
        content: 'Chargement en cours...',
      });
  }

}