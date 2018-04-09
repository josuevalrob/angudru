import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// Enviroment variables
import { environment } from '../../environments/environment';
// User list class
import { UserList } from '../user-list';

@Injectable()
export class UserlistService {

  constructor(private http: HttpClient) { }
  private mainUrl = environment.mainUrl;  // URL to web api
  getUserList(): Observable<UserList[]> {
  	const users = this.http.get<UserList[]>(this.mainUrl + 'user-list?_format=json')
  	// console.log(JSON.stringify(users));
  	// this.alertService.add('HeroService: fetched heroes');
  	return users;    	  
  }
}
