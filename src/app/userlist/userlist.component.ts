import { Component, OnInit } from '@angular/core';

import { UserlistService } from '../services/userlist.service'
import { UserList } from '../user-list';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
	users: UserList[];
  errorMsg : any;
  
  constructor(private userlistservice: UserlistService) { }

  ngOnInit() {
    this.getUsers();
  }  
  getUsers(): void {
    this.userlistservice.getUserList()
      .subscribe(
        users => this.users = users,
        error => this.errorMsg = error
        );
  }
}