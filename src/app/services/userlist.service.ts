import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import {Headers, RequestOptions } from '@angular/http';

// Enviroment variables
import { environment } from '../../environments/environment';
// User list class
import { UserList } from '../user-list';

import { HandleErrorService } from './handle-error.service';
// check if the token is working... 
import { AuthService } from './auth.service';


@Injectable()
export class UserlistService {

  constructor(private http: HttpClient, public auth: AuthService, private handleError: HandleErrorService) { }
  private token = this.canActivate();  
  private mainUrl = environment.mainUrl + 'user-list?_format=json';  // URL to web api
  
  getUserList(): Observable<UserList[]> {
  	let tokenParse = JSON.parse(this.token)    
    // let myHeaders = new Headers();
    // myHeaders.set('Authorization', `Bearer ${tokenParse}`);
    // let options = new RequestOptions({ headers: myHeaders});
    const users = this.http.get<UserList[]>(this.mainUrl, { headers:new HttpHeaders().append('Authorization', `Bearer ${tokenParse}`)})
  	// const users = this.http.get<UserList[]>(this.mainUrl, options);
    return users
            .catch(this.handleError.handleError);     	  
  }

  canActivate() {
  	if (this.auth.isAuthenticated()){
  		// console.log ('bye');
  		const token = localStorage.getItem('token');
  		return token;
  	}
  }
}

  // const headers = new Headers().append('Authorization', `Bearer ${tokenParse}`);
  // console.log(JSON.stringify(tokenParse));
  // headers.set('Authorization', `Bearer ${tokenParse}`);
  // const opts = new RequestOptions({ headers: headers });  
  // console.log(JSON.stringify(opts));
  // const users = this.http.get<UserList[]>(this.mainUrl, opts)