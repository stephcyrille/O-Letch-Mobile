import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Answer, AnswerPost } from '../models/answer.model';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class AnswerServiceProvider {
    private baseUrl = "https://mebenga.pythonanywhere.com/api/";
    // private baseUrl = "http://192.168.1.100:8000/api/";

    constructor(public http: Http) {
        
    }

    public getAnswerList(id:number): any{
        const url = `${this.baseUrl}questions/${id}/answers/`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Answer)
            .catch(error => console.log('Une érreur est survenue' + error))
    }

    public postAnswer(answer: AnswerPost): any{
        const url = `${this.baseUrl}questions/add/answers/`;

        const headers = new Headers();
  	    headers.append('content-type', 'application/json');

        return this.http.post(url,  JSON.stringify(answer), {headers : headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json() || 'server error');
    }

}