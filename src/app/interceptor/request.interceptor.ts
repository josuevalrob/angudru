import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
// HttpInterceptor interface. 
export class RequestInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}
  // method called intercept with HttpRequest and HttpHandler parameters. 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    // Using interceptors is all about changing outgoing requests and incoming responses, 
    // but we can’t tamper with the original request–it needs to be immutable. 
    // To make changes we need to clone the original request.      
      request = request.clone({
        // add an Authorization header with an auth scheme of Bearer followed by the 
        // JSON Web Token in local storage which we get from a call to the getToken method 
        // from the AuthService.
          setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
          }
      });
      // Calling next.handle means that we are passing control to the next interceptor in the chain, if there is one.
      return next.handle(request);
  }
}