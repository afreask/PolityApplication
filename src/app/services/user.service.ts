import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    // public user = this.getUser();

    getUser()
    {
        return this.http.get(`https://localhost:44394/`);
    }

    register(user)
    {
        return this.http.post(`https://localhost:44394/user/register`, user);
    }

    login(user)
    {
        return this.http.post(`https://localhost:44394/user/login`, user);
    }

    logout()
    {
        return this.http.post(`https://localhost:44394/user/logout`);
    }


}
