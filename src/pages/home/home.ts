import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ProjectPage } from '../project/project';
import { QAndRPage } from '../q-and-r/q-and-r';
import { NewsPage } from '../news/news';
import { NavController } from 'ionic-angular/navigation/nav-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage{
  tab1Root: any = ProjectPage;
  tab2Root: any = QAndRPage;
  tab3Root: any = NewsPage;
  myIndex: number;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = 1; 
  }

}
