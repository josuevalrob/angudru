import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
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
  private asd = {
  	  headers: new HttpHeaders({ "Authorization": "Bearer " + this.token})
  };
  private mainUrl = environment.mainUrl + 'user-list?_format=json';  // URL to web api
  
  getUserList(): Observable<UserList[]> {
  	console.log(JSON.stringify(this.token));
  	const users = this.http.get<UserList[]>(this.mainUrl, this.asd)
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
