import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, NavParams } from 'ionic-angular';
import { Weather } from '../../models/weather.model';
import { WeatherServiceProvider } from '../../provider/weather.service';



@Component({
  selector: 'page-weater',
  templateUrl: 'weater.html',
})
export class WeaterPage{
  fetched: boolean= false;
  loading: Loading;
  eboa: Weather;
  yaounde: Weather; douala: Weather; nkongsamba: Weather; bertoua: Weather; ebolowa: Weather;ngoumou: Weather;yabassi: Weather;

  cityItems = [];
  city = ["yaounde", "ngoumou", "bertoua", "ebolowa", "douala", "nkongsamba", "yabassi"]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public weatherService: WeatherServiceProvider, 
              public loadingCtrl: LoadingController) {
    
                
    this.cityItems = [this.yaounde, this.ngoumou, this.bertoua, this.ebolowa, this.douala,  this.nkongsamba, this.yabassi];
    
    this.createLoader();
    this.loading.present();

    for(let i=0; i < this.city.length; i++){
      this.weatherService.getWeather(this.city[i]).then(
        weatherFetched => {
                            this.cityItems[i] = weatherFetched;
                            console.log(this.cityItems[i]);
      });
    }
    this.fetched = true;
    this.loading.dismiss();
      //this.getWeather();
  }

  
  createLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
        content: 'Chargement en cours...',
      });
  }


}