import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageService } from './services/page.service';
import { UserService } from './services/user.service';
import { PagesComponent } from './components/pages/pages.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserAddPageComponent } from './components/user-add-page/user-add-page.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes =
[
    {path: 'user/page', component: UserPageComponent},
    {path: 'user/add-page', component: UserAddPageComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'user/logout', component: LogoutComponent},
    {path: 'user/register', component: RegisterComponent},
    {path: ':page', component: PagesComponent},
    {path: '', component: LandingPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagesComponent,
    UserPageComponent,
    UserAddPageComponent,
    LandingPageComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
