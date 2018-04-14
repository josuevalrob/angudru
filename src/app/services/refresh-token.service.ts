import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Token } from '../token';

import { HandleErrorService } from './handle-error.service';
import { AuthService } from './auth.service'

@Injectable()
export class RefreshTokenService {
// Enviroment variables from drupal site and client
	private mainUrl = environment.mainUrl;  
	private grant_type = environment.grant_type
	private client_id = environment.client_id
	private client_secret = environment.client_secret
  
  constructor(private http: HttpClient, public auth: AuthService, private handleError: HandleErrorService) { }

  refreshToken(): Observable<string> {
    let refreshAuth = this.getRefreshToken(); //get refresh token from storage
    let url: string = this.mainUrl + "oauth/token";

    let body= new FormData();  	  
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", refreshAuth)
    body.append("client_id", this.client_id);
    body.append("client_secret", this.client_secret);
    return this.http.post(url, body)      
		.map((token: Token) => {      		
	        // let tokenParse = JSON.parse(token.access_token)		
			// localStorage.setItem('token', JSON.stringify(tokenParse));
			localStorage.setItem('token', JSON.stringify(token.access_token));
	        localStorage.setItem('refresh_token', JSON.stringify(token.refresh_token));
    		return token.access_token
		});
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

}