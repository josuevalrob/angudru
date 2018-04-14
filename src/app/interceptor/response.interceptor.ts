import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(request).do((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want

    }
  },(err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 403) {
        this.auth.collectFailedRequest(request);
        console.log ('Whatsup loser!!');
      }
    }
  });

 }
}
