import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { ArticleServiceProvider } from '../../provider/news.service';
import { Article } from '../../models/article.model';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage{
  articles: Array<Article> = [];
  loading: Loading;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private articleService: ArticleServiceProvider,
              public loadingCtrl: LoadingController) 
  { }

  ionViewDidLoad() {
    this.createLoader();
    this.loading.present();

    this.articleService.getArticles()
    .then(newsFetched => {
      this.articles = newsFetched;
      console.log(this.articles);
      this.loading.dismiss();
    });
  }

  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }

  openNotifPage(){
    this.navCtrl.push(NotificationPage);
  }

  openProfPage(){
    this.navCtrl.push(ProfilePage);
  }

  doRefresh(refresher){
    this.articleService.getArticles()
    .then(newsFetched => {
      this.articles = newsFetched;
      console.log(this.articles);
    });

    if(refresher != 0){
      refresher.complete();
    }
  }
  

}
