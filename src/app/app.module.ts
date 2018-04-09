import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// ERROR Error: Uncaught (in promise): 
// Error: StaticInjectorError(AppModule)[UserlistService -> HttpClient]: 
// StaticInjectorError(Platform: core)[UserlistService -> HttpClient]: 
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlistService } from './services/userlist.service';
import { UserloginComponent } from './userlogin/userlogin.component';
import { LoginService } from './services/login.service';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    UserloginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserlistService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
