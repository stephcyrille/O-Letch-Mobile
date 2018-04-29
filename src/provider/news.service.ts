import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Article } from '../models/article.model';



@Injectable()
export class ArticleServiceProvider {
    private baseUrl = "https://mebenga.pythonanywhere.com/api/";
    // private baseUrl = "http://192.168.1.100:8000/api/";

    constructor(public http: Http) {
        
    }

    public getArticles(): any{
        const url = `${this.baseUrl}articles`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Article)
            .catch(error => console.log('Une érreur est survenue' + error))
    }

}