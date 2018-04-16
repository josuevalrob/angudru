// this service will handle error:
// 401 Unauthorized
// 403 forbiden
// 40? for refresh token
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
