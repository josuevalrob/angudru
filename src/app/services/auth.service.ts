// Cheking the authenticity of the token. 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthService {
  
  constructor(public jwtHelper: JwtHelperService) { }
  
  public getToken(): string {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
  }  
  
// I need my refresh token function here. 
public getrefreshToken(): string {
    const refresh_token = localStorage.getItem('refresh_token');
    return JSON.parse(refresh_token);
}

  public isAuthenticated(): boolean {
  	// console.log (localStorage['token']);
  	const token = this.getToken();
  	// let tokenParse = JSON.parse(token)		
  	// console.log(JSON.stringify(tokenParse));
  	// Check wheter the token is expired and return true or false
  	return !this.jwtHelper.isTokenExpired(token);
  }

  cachedRequests: Array<HttpRequest<any>> = [];
  
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

}
