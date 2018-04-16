import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './services/guard.service'

import { UserlistComponent } from './userlist/userlist.component'
import { UserloginComponent } from './userlogin/userlogin.component'

const routes: Routes = [
  // { path: '', component: UserlistComponent, canActivate: [GuardService] },
  { path: '', component: UserlistComponent},
  { path: 'login', component: UserloginComponent},
  //Home sweet home:
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
