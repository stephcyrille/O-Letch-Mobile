import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { QuestionSinglePage } from '../question-single/question-single';
import { Question } from '../../models/question.model';
import { QuestionServiceProvider } from '../../provider/questions.service';
import { AddQuestionPage } from '../add-question/add-question';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { NavParams } from 'ionic-angular/navigation/nav-params';



@Component({
  selector: 'page-q-and-r',
  templateUrl: 'q-and-r.html',
})
export class QAndRPage{
  options: NativeTransitionOptions;
  questions: Array<Question> = [];
  loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private questionService: QuestionServiceProvider,
              public loadingCtrl: LoadingController,
              private nativePageTransitions: NativePageTransitions) {
  
    this.createLoader();
    this.loading.present();

    this.questionService.getQuestions()
    .then(questionsFetched => {
      this.questions = questionsFetched;
      console.log(this.questions);
      this.loading.dismiss();
    });
    
  }
            
  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }
  
  
  openNavDetailsPage(question) {

    this.options = {
      duration:     500,
      iosdelay:     50,
      androiddelay: 100
    };
    
    this.nativePageTransitions.fade(this.options)
    this.navCtrl.push(QuestionSinglePage, { question: question });
  }

  addQuestion() {
    this.options = {
      duration:     500,
      iosdelay:     50,
      androiddelay: 50
    };
    
    this.nativePageTransitions.fade(this.options)
    this.navCtrl.push(AddQuestionPage);
  }

}
