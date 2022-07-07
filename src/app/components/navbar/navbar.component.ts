import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component
({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit 
{
  pages: any;
  user: any;

  constructor
  (
    public pageService: PageService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      // Instantiates the pages object
      this.pages = this.user.pageList;
      // this.pageService.getPages(this.user.userID).subscribe(pages => 
      // {
      //     this.pageService.pagesBS.next(pages);
      //     this.pages = this.pageService.pagesBS;
      //     console.log(pages);
          
      // });
      console.log(this.pages);
      // console.log(this.pageService.user);
  }

  logout(): void
  {
      localStorage.removeItem("user");
      this.router.navigateByUrl('user/login');
      console.log(localStorage.getItem("user"))
  }
    
}
