import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'title name';
  user: any = JSON.parse(localStorage.getItem("user"));
  successMsg: string;
  page: any ;

  constructor(

    private router: Router
  ) 
  {
    if(this.user != null)
    {
       this.page = this.user.pageList[this.user.pageList.length - 1]
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('user/login').then(() => {
      window.location.reload();
    });
    // console.log(localStorage.getItem("user"))
  }
}
