import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

    pages: any;
    successMsg: boolean = false;
    user: any;
    page: any;

    constructor
    (
        private router: Router,
        private pageService: PageService,
        private userService: UserService
    ) { }

    ngOnInit(): void 
    {
        this.userService.loginCheck()
        this.pages = this.pageService.pagesBS;
        this.user = JSON.parse(localStorage.getItem("user"));
        console.log(this.user);
        this.page = this.user.pageList[this.user.pageList.length - 1];
    }

}
