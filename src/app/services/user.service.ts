import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
    return this.http.post(`https://localhost:44394/user/login`, user);
  }

  logout() {
    return this.http.post(`https://localhost:44394/user/logout`, 1);
  }
}
