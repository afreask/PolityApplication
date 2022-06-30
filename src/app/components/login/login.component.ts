import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {
//   ReactiveFormsModule,
//   FormGroup,
//   FormControl,
//   Validators,
// } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private loginFailed: boolean = false;
  private userRegistered: boolean = false;
  email: string;
  password: string;
  user: any = {};
  // userLoginForm = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[a-z0-9._%+-]$'),
  //   ]),
  // });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // if(localStorage.getItem('userRegistered'))
    // {
    //     this.userRegistered = true;
    // }
  }

  login({ form, value, valid }: any): void {
    // console.log(value);

    if (valid) {
      var email = {
        emailAddress: value.email,
      };
      this.user.emailList = [];
      this.user.emailList.push(email);
      this.user.password = value.password;
      // console.log(this.user);
      this.userService.login(this.user).subscribe((res) => {
        if (res != 'Invalid login') {
          this.router.navigateByUrl('/user/page');
          console.log(res);
        }
        else {
        }
      });
    }
  }
}
