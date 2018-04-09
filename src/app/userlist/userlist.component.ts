import { Component, OnInit } from '@angular/core';
// Import the user class
import { UserList } from '../user-list';
import { UserlistService } from '../services/userlist.service'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
	users: UserList[];

  constructor(private userlistservice: UserlistService) { }

  ngOnInit() {
    this.getUsers();
  }  
  getUsers(): void {
    this.userlistservice.getUserList()
      .subscribe(users => this.users = users);
  }

}
