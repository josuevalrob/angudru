import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Token } from '../token'

@Injectable()
export class LoginService {
	private mainUrl = environment.mainUrl;  // URL to web api
	private grant_type = environment.grant_type
	private client_id = environment.client_id
	private client_secret = environment.client_secret

  constructor(private http: HttpClient) { }
  login (user, pass): Observable<Token> {  	
  	  const url = `${this.mainUrl}oauth/token`;  
  	  let body= new FormData();  	  
  	  body.append("grant_type", this.grant_type);
  	  body.append("client_id", this.client_id);
  	  body.append("client_secret", this.client_secret);
  	  body.append("username", user);
  	  body.append("password", pass);  	  
      return this.http.post(url, body)      
      			.map((token: Token) => {      				
      				localStorage.setItem('token', JSON.stringify(token.access_token));
      				
              return token.access_token      				
      			})
      			.catch(this.handleError);    			
  }
  private handleError(err: HttpErrorResponse) {
  	  let errorMessage = '';
  	  if (err.error instanceof Error) {
  	    // A client-side or network error occurred. Handle it accordingly.
  	    errorMessage = `An error occurred: ${err.error.message}`;
  	  } else {
  	    // The backend returned an unsuccessful response code.
  	    // The response body may contain clues as to what went wrong,  	    
  	    if (err.status == 401) {
  	    	 errorMessage = `Invalid credentials, ${err.error.message}`;
  	    }
  	  }
  	  
  	  return Observable.throw(errorMessage);

  }

  logout() {
  	localStorage.removeItem('token');
  	console.log ('localstorage logout' + localStorage['token']);  
  }

}
