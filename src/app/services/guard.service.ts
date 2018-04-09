import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class GuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
  	if (!this.auth.isAuthenticated()){
  		console.log ('bye');
  		this.router.navigate(['/login']);
  		return false;
  	}
  	console.log ('Welcome');
  	return true;
  }

}
// The service injects AuthService and Router and has a single method called canActivate. 
// This method is necessary to properly implement the CanActivate interface.
// The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed. 
// If the user isn’t authenticated, they are re-routed to some other place, in this case a route called /login.
