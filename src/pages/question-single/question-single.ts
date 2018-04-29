import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { NavParams, ViewController, Loading, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AnswerServiceProvider } from '../../provider/answer.service';
import { Question } from '../../models/question.model';
import { Answer, AnswerPost } from '../../models/answer.model';
import { Profile } from '../../models/user.model';
import { ProfileServiceProvider } from '../../provider/profile.service';



@Component({
  selector: 'page-question-single',
  templateUrl: 'question-single.html',
})
export class QuestionSinglePage{
  question: Question;
  answers: Array<Answer>;
  answerPosted: AnswerPost;
  loading: Loading;
  toggle: boolean;
  author: Profile;
  user: string;
  obj: any;
  errors;


  private answerForm : FormGroup;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private loadingCtrl: LoadingController, 
              private answerService: AnswerServiceProvider,
              private formBuilder: FormBuilder,
              private profileService: ProfileServiceProvider,
              private storage: Storage) 
  {

    this.storage.get('user').then(user => {
        this.user = user;
        this.getProfile(this.user);
      }
    );

    this.question = navParams.data.question;


    this.answerForm = this.formBuilder.group({
      content: new FormControl('', Validators.required),
    });

    this.getAnswerList(this.question.id);
    console.log(this.question);
    this.toggle = false;

  }



  getAnswerList(id:number){

    this.answerService.getAnswerList(id)
    .then(answersFetched => {
      this.answers = answersFetched;
      console.log(this.answers);
    })
    .catch((error) => {console.log(error);});
  }



  /* Here is the get get profile function that allow us to get a current user */
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


  /* Here is the fuction in wich we will create an instance of answer post service provider */
  postService(answer: AnswerPost){
    this.createLoader();
    this.loading.present();

    this.answerService.postAnswer(answer)
      .subscribe((result) => {
            this.obj = result;
            this.toggle = false;
            this.loading.dismiss();
        }, error => {
            console.log(error);  
            this.loading.dismiss();
        }
      );

  }

 

  addNewAnswer(){
    console.log(this.answerForm.value);
    let content = this.answerForm.value.content;

    this.answerPosted = {
      author: this.author.id,
      question: this.question.id,
      content: content,
      vote : 0,
      created_at: new Date,
    }

    this.postService(this.answerPosted);

  }



  showAnswerForm(){
    this.toggle = true;
    console.log(this.toggle);
  }

  
  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }


  doRefresh(refresher){
    this.getAnswerList(this.question.id);
    if(refresher != 0){
      refresher.complete();
    }
  }


}
