import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pages: any;
  user: any;

  constructor(
    public pageService: PageService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
    // Instantiates the pages object
    if(this.user!= null)
    {
        this.pages = this.user.pageList;
        console.log(this.pages);

    }
    // this.pageService.getPages(this.user.userID).subscribe((pages) => {
    //   console.log(pages);
    //   this.pageService.pagesBS.next(pages);
    //   this.pages = this.pageService.pagesBS;
    // });
    // console.log(this.pages);
    // console.log(this.pages);
    // console.log(this.pageService.user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('user/login').then(() => {
      window.location.reload();
    });
    // console.log(localStorage.getItem("user"))
  }
}
