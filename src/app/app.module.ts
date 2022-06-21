import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageService } from './services/page.service';
import { PagesComponent } from './components/pages/pages.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserAddPageComponent } from './components/user-add-page/user-add-page.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const appRoutes: Routes =
[
    {path: 'user/page', component: UserPageComponent},
    {path: 'user/add-page', component: UserAddPageComponent},
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
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
