import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  // public user = this.getUser();

  getUser() {
    return this.http.get(`https://localhost:44394/`);
  }

  register(user) {
    return this.http.post(`https://localhost:44394/user/register`, user);
  }

  login(user) {
    // console.log(user);
    // const headers = new HttpHeaders().append(
    //   'Content-Type',
    //   'application/json'
    // );
    // const body = JSON.stringify(user);
    // const params = new HttpParams()
    //   .append('email', user.email)
    //   .append('password', user.password);
    // console.log(params);
    // return this.http.post(`https://localhost:44394/user/login`, body, {
    //   headers: headers,
    //   params: params,
    // });
    return this.http.post(`https://politywebapplication20220706124808.azurewebsites.net/user/login`, user);
    // return this.http.post(`https://localhost:44394/user/login`, user);
  }

  loginCheck()
  {
      if(localStorage.getItem("user") == null)
      {
          this.router.navigateByUrl('user/login')
      }
  }
}
