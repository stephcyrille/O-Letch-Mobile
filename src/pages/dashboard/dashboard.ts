import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as HighCharts from 'highcharts';



@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage{
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    (function () {
      var data = [];
      
      for (let i = 0; i <= 5; i += 1) {
      data.push({
      x: i,
      y: Math.floor(Math.random() * 10) + 0
      });
      }
      return data;
      }())
  }

  ionViewDidLoad() {
    HighCharts.chart('container', {
      chart: {
              type: 'line'
      },
      title: {
              text: 'Développement des cultures'
      },
      xAxis: {
              categories: ['1er Semestre', '2e Semestre', '3e Semestre']
      },
      yAxis: {
              title: {
              text: 'Mois écoulés'
      }
      },
      series: [
                {
                  name: 'Maïs',
                  data: [1, 0, 4]
                }, 
                {
                  name: 'Haricot',
                  data: [5, 7, 3]
                  }
      ]
    });

    HighCharts.chart('graphAd', {
      chart: 
      {
        type: 'spline'
      },
      title: 
      {
        text: 'Consommation d\'engrais'
      },
      xAxis: 
      {
        categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']
      },
      yAxis: 
      {
        title: 
        {
          text: 'Quantité (en Kg)'
        }
      },
      series: 
      [
        {
          name: 'Urée (CH4N2O)',
          data: (function () 
          {
            var data = [];
            for (let i = 0; i <= 5; i += 1) 
            { 
              data.push({ x: i, y: Math.floor(Math.random() * 10) + 0 }); 
            } 
            return data; 
          }()) 
        }, 
        { 
          name: 'Ammonitrate', 
          data: (function () 
          { 
            var data = []; 
            for (let i = 0; i <= 5; i += 1) 
            { 
              data.push({ x: i, y: Math.floor(Math.random() * 10) + 0 }); 
            } 
            return data; 
          }()) 
        }] 
    });

        
      }

}
