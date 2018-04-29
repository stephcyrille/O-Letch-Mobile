import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { QuestionPost, Question } from '../models/question.model';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class QuestionServiceProvider {
    private baseUrl = "https://mebenga.pythonanywhere.com/api/";
    // private baseUrl = "http://192.168.1.100:8000/api/";

    constructor(public http: Http) {
        
    }

    public getQuestions(): any{
        const url = `${this.baseUrl}questions`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(error => console.log('Une érreur est survenue' + error))
    }

    public getSingleQuestion(id: number): any{
        const url = `${this.baseUrl}questions/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(error => console.log('Une érreur est survenue' + error))
    }

    public postQuestions(question: QuestionPost): any{
        const url = `${this.baseUrl}questions/`;

        const headers = new Headers();
  	    headers.append('content-type', 'application/json');

        return this.http.post(url,  JSON.stringify(question), {headers : headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json() || 'server error');
    }
}