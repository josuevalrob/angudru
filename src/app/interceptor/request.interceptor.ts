import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";

import { RefreshTokenService } from '../services/refresh-token.service'
import { Token } from './../token'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { HandleErrorService } from '../services/handle-error.service'
import { LoginService } from '../services/login.service';

@Injectable()
// HttpInterceptor interface. 
export class RequestInterceptor implements HttpInterceptor {


    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService: AuthService, public login: LoginService, public handleError: HandleErrorService, private refreshToken: RefreshTokenService) {}
    // addToken will add the Bearer token to the Authorization header
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
    }
    // The RequestInterceptorService will implement HttpInterceptor which has only one method:  
    // intercept.  It will add a token to the header on each call and catch any errors that might occur.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // In the intercept method, we return next.handle and pass in the cloned request with a header added
        // Get the auth token from the AuthService
        console.log('here we go');
        return next.handle(this.addToken(req, this.authService.getToken()))        
          .catch(error => {
             if (error instanceof HttpErrorResponse) {
                     switch ((<HttpErrorResponse>error).status) {
                         case 401:
                              console.log('error 401'); 
                             return this.handle400Error(error);
                         case 403:
                             console.log('error 401');
                             return this.handle401Error(req, next);
                     }
             } else {
               return Observable.throw(error);
            }
          });
    }

    // The code to handle the 401 error is the most important.
        handle401Error(req: HttpRequest<any>, next: HttpHandler) {
            // If isRefreshingToken is false (which it is by default) we will 
            // enter the code section that calls authService.refreshToken
            if (!this.isRefreshingToken) { 
                // Immediately set isRefreshingToken to true so no more calls 
                // come in and call refreshToken again – which we don’t want of course
                this.isRefreshingToken = true; 

                // Reset here so that the following requests wait until the token
                // comes back from the refreshToken call.
                this.tokenSubject.next(null);
                // Call authService.refreshToken (this is an Observable that will be returned)
                return this.refreshToken.refreshToken()
                    .switchMap((newToken: string) => {
                        if (newToken) {
                            // When successful, call tokenSubject.next on the new token, 
                            // this will notify the API calls that came in after the refreshToken 
                            // call that the new token is available and that they can now use it
                            this.tokenSubject.next(newToken);
                            // Return next.handle using the new token
                            return next.handle(this.addToken(req, newToken));
                        }

                        // If we don't get a new token, we are in trouble so logout.
                        return this.login.logout();
                    })
                    .catch(error => {
                        // If there is an exception calling 'refreshToken', bad news so logout.
                        return this.login.logout();
                    })
                    .finally(() => {
                        // When the call to refreshToken completes, in the finally block, 
                        // reset the isRefreshingToken to false for the next time the token needs to be refreshed
                        this.isRefreshingToken = false;
                    });
            // Note that no matter which path is taken, we must return an Observable that ends up 
            // resolving to a next.handle call so that the original call is matched with the altered call                
            }
            // If isRefreshingToken is true, we will wait until tokenSubject has a non-null value 
            // – which means the new token is ready 
            else {

                return this.tokenSubject
                    .filter(token => token != null)
                    // Only take 1 here to avoid returning two – which will cancel the request
                    .take(1)
                    .switchMap(token => {
                        // When the token is available, return the next.handle of the new request
                        return next.handle(this.addToken(req, token));
                    });
            }
        }

        handle400Error(error) {
            console.log('outside conditional');
            // Some may be wondering at this point what would happen if the refresh token times out.  
            // Usually caused by not making any API calls for whatever the timeout is configured for.  
            // Well, what happens is that you should see a 400 error with an ‘invalid_grant’ message.  
            // So the handle400Error code should most likely log out the user and direct them to the login page.
            if (error && error.status === 401 || error.error && error.error.error === 'invalid_grant') {
                // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
                console.log('inside the conditional');
                return this.login.logout();
            }

            return Observable.throw(error);
        }




}