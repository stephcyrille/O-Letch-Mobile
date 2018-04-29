import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Profile, ProfilePost } from '../models/user.model';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class ProfileServiceProvider {
    private baseUrl = "https://mebenga.pythonanywhere.com/api/";
    // private baseUrl = "http://192.168.1.100:8000/api/";


    constructor(public http: Http) {
    }

    public getProfile(user:string): any{
        const url = `${this.baseUrl}profiles/${user}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Profile)
            .catch(error => {console.log('(' + error.status + ')' + ' Une érreur est survenue'); console.log(error)})
    }

    public getProfileById(id:number): any{
        const url = `${this.baseUrl}profiles/byId/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Profile)
            .catch(error => console.log('Une érreur est survenue' + error))
    }

    public postProfile(profile: ProfilePost, user:string): any{
        const url = `${this.baseUrl}profiles/${user}/`;
        const headers = new Headers();
  	    headers.append('content-type', 'application/json');

        return this.http.post(url, JSON.stringify(profile), {headers : headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json() || 'server error');
    }



}