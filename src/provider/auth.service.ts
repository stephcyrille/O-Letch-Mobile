import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Observable} from 'rxjs/Rx';

import { UserModel } from '../models/user.model';
import { CredentialsModel } from '../models/credential.model';




@Injectable()
export class AuthServiceProvider {
    private baseUrl = "https://mebenga.pythonanywhere.com/api/";
    // private baseUrl = "http://192.168.1.100:8000/api/";
    public idToken: string;
    refreshSubscription: any;

    constructor(public http: Http, private storage: Storage) {        
        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });   
    }

    public register(user: UserModel): any{
        const url = `${this.baseUrl}auth/register/`;

        const headers = new Headers();
  	    headers.append('content-type', 'application/json');

        return this.http.post(url,  JSON.stringify(user), {headers : headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json() || 'server error');
    }


    public login (credentials: CredentialsModel): Observable<boolean> {
        return this.http.post(this.baseUrl + "auth/login", credentials)
          .map(data => {
             const token = data.json() && data.json().token;
             if(token){
                this.idToken = token
                this.storage.set("user", credentials.username);
                this.storage.set("id_token", token);
                
                return true;
                
             } else {

                 return false
             }
             
          })
          .catch(this.handelError);
      }
    

    logout(): void{

        this.storage.remove('user');
        this.storage.remove('id_token');
    
      }

    private handelError(error: Response){
        return Observable.throw(error.json() || 'server error');
    }

}