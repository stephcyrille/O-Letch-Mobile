import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions'

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { FieldPage } from '../field/field';
import { PricePage } from '../price/price';
import { WeaterPage } from '../weater/weater';
import { DashboardPage } from '../dashboard/dashboard';




export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage{
  options: NativeTransitionOptions;

  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  pages: PageInterface[] = [
    { 
      title: 'Tableau de bord', 
      pageName: 'DashboardPage', 
      tabComponent: DashboardPage, 
      index: 0, 
      icon: 'pulse' 
    },
    { 
      title: 'Meteo', 
      pageName: 'WeaterPage', 
      tabComponent: WeaterPage, 
      index: 1, 
      icon: 'rainy' 
    },
    { 
      title: 'Prix des produits', 
      pageName: 'PricePage', 
      tabComponent: PricePage, 
      index: 2, 
      icon: 'trending-up' 
    },
    { 
      title: 'Espaces agricoles a louer', 
      pageName: 'LandPage', 
      tabComponent: FieldPage, 
      index: 3, 
      icon: 'map' 
    },
    { 
      title: 'Mon Profil', 
      pageName: 'ProfilePage', 
      tabComponent: ProfilePage, 
      index: 4, 
      icon: 'person'
    },
    { 
      title: 'Parametre', 
      pageName: 'SettingPage', 
      tabComponent: SettingPage, 
      index: 5, 
      icon: 'options' 
    },
    { 
      title: 'A Propos', 
      pageName: 'AboutPage', 
      tabComponent: AboutPage, 
      index: 6, 
      icon: 'information-circle' 
    },
  ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private nativePageTransitions: NativePageTransitions) {
  }

  openPage(page: PageInterface) {
    this.options = {
      duration:     500,
      iosdelay:     50,
      androiddelay: 100
    };
    
    this.nativePageTransitions.fade(this.options)
    this.navCtrl.push(page.tabComponent);
  }
}
