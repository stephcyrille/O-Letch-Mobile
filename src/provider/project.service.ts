import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { ProjectBase, Project } from '../models/project.model';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class ProjectServiceProvider {
    private baseUrl = "https://mebenga.pythonanywhere.com/api/";
    // private baseUrl = "http://192.168.1.100:8000/api/";


    constructor(public http: Http) {
    }

    public postProject(project: ProjectBase){
        const url = `${this.baseUrl}project/base/`;
        const headers = new Headers();
  	    headers.append('content-type', 'application/json');

        return this.http.post(url,  JSON.stringify(project), {headers : headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    public getProject(username: string): Observable<any[]>{
        const url = `${this.baseUrl}project/${username}`;

        return this.http.get(url)
            .map(res => <Project[]> res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json().errors || 'server error');
    }

}