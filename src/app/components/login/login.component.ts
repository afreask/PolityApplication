import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private loginFailed: boolean = false;
    private userRegistered: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        if(localStorage.getItem('userRegistered'))
        {
            this.userRegistered = true;
        }
    }

}
