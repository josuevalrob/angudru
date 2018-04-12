import { Injectable } from '@angular/core';
// Cheking the authenticity of the token. 
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
  	// console.log (localStorage['token']);
  	const token = localStorage.getItem('token');
  	// let tokenParse = JSON.parse(token)		
  	// console.log(JSON.stringify(tokenParse));
  	// Check wheter the token is expired and return true or false
  	return !this.jwtHelper.isTokenExpired(token);
  }
}
