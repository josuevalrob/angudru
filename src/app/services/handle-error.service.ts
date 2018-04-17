// this service will handle error:
// 401 Unauthorized
// 403 forbiden
// 40? for refresh token
import { Injectable } from '@angular/core';
// import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HandleErrorService {

  constructor(private http: HttpClient) { }
  public handleError(err: HttpErrorResponse) {
  	  let errorMessage = '';
  	  if (err.error instanceof Error) {
  	    // A client-side or network error occurred. Handle it accordingly.
  	    errorMessage = `An error occurred: ${err.error.message}`;
  	  } else {
  	    // The backend returned an unsuccessful response code.
  	    // The response body may contain clues as to what went wrong,  	    
  	    if (err.status == 401) {
  	    	// console.log ('loser 401')
           errorMessage = `Invalid credentials, ${err.error.message}`;
  	    }
  	    if (err.status == 403) {
          // console.log ('loser 403')
  	    	 errorMessage = `Forbiden loser!!, ${err.error.message}`;
  	    }
  	  }  	  
  	  return Observable.throw(errorMessage);
  }
}
