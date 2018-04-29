import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Weather } from '../models/weather.model';



@Injectable()
export class WeatherServiceProvider {
    apiKey: string = "d2f26f868ad44af8b77100551182203"
    private baseUrl = "http://api.apixu.com/v1/current.json?key=";

    constructor(public http: Http) {
        
    }

    public getWeather(city: string): any{
        const url = this.baseUrl + this.apiKey + "&q=" + city + "&lang=fr";

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Weather)
            .catch(error => console.log('Une érreur est survenue' + error))
    }
}