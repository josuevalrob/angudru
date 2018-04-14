// Cheking the authenticity of the token. 
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  constructor(public jwtHelper: JwtHelperService) { }
  
  public getToken(): string {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
  }
  
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  
  public isAuthenticated(): boolean {
  	// console.log (localStorage['token']);
  	const token = this.getToken();
  	// let tokenParse = JSON.parse(token)		
  	// console.log(JSON.stringify(tokenParse));
  	// Check wheter the token is expired and return true or false
  	return !this.jwtHelper.isTokenExpired(token);
  }

}
