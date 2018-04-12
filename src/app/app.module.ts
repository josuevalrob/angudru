import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// ERROR Error: Uncaught (in promise): 
// Error: StaticInjectorError(AppModule)[UserlistService -> HttpClient]: 
// StaticInjectorError(Platform: core)[UserlistService -> HttpClient]: 
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlistService } from './services/userlist.service';
import { UserloginComponent } from './userlogin/userlogin.component';
import { LoginService } from './services/login.service';

import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';
import { HandleErrorService } from './services/handle-error.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

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
    FormsModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
        // blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  providers: [UserlistService, LoginService, AuthService, GuardService, HandleErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
