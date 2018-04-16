import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { RefreshTokenService } from '../services/refresh-token.service'
import { Token } from './../token'
import 'rxjs/add/operator/do';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable()
// HttpInterceptor interface. 
export class RequestInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public auth: AuthService, public refresh: RefreshTokenService) {}
  
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
  }

  // method called intercept with HttpRequest and HttpHandler parameters. 
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    // Using interceptors is all about changing outgoing requests and incoming responses, 
    // but we can’t tamper with the original request–it needs to be immutable. 
    // To make changes we need to clone the original request.      
      // console.log('intercepted request ' + JSON.stringify(request)); 
      // request = request.clone({
      //   // add an Authorization header with an auth scheme of Bearer followed by the 
      //   // JSON Web Token in local storage which we get from a call to the getToken method 
      //   // from the AuthService.
      //     setHeaders: {            
      //       Authorization: `Bearer ${this.auth.getToken()}`
      //     }
      // });
      // Calling next.handle means that we are passing control to the next interceptor in the chain, if there is one.
      return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },(err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            // this.auth.collectFailedRequest(request);
            console.log ('403 error! now, refresh token');        
            const newtoken =  this.refresh.refreshToken().subscribe((response:any)=>{})

            console.log ('new token... ' + JSON.stringify(newtoken));
              // error => this.errorMsg = error
            
          }
        }
      });
  }
}