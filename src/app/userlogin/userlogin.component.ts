import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import {User} from '../user';
import { Token } from '../token' 
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

	constructor( private LoginService: LoginService, private router: Router, private route: ActivatedRoute ) { }
  public errorMsg;
  ngOnInit() {
  	this.LoginService.logout();
  }

    onSubmit(name: string, pass: string): void { 
    	name = name.trim();
    	if (!name) { return; }

  		let user: any = { name, pass };
  		 // console.log('Body ' +JSON.stringify(user));    
  		this.LoginService.login(user.name, user.pass)
  		  .subscribe(
          data => {             
             // console.log(JSON.stringify(data));
            this.router.navigate (['/']);                        
  		     },         
          error => this.errorMsg = error
           );
    }

}
