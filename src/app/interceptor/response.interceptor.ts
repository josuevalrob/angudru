import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { RefreshTokenService } from '../services/refresh-token.service'

import { Token } from './../token'
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

newtoken: Token[]
errorMsg : any;

  constructor(public auth: AuthService, public refresh: RefreshTokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(request).do((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want
    }
  },(err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 403) {
        this.auth.collectFailedRequest(request);
        console.log ('403 error! now, refresh token');
        
        return this.refresh.refreshToken().subscribe(
          newtoken => { 
             console.log('Token in the interceptor ' +  JSON.stringify(Token));
             return Token;        
             });
          // error => this.errorMsg = error
        
      }
    }
  });

 }
}
