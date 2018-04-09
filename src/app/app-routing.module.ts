import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlistComponent } from './userlist/userlist.component'

import { UserloginComponent } from './userlogin/userlogin.component'

const routes: Routes = [
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', component: UserlistComponent },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserloginComponent},
  //Home sweet home:
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
