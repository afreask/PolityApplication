import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

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
    public userService: UserService
  ) { }

  ngOnInit(): void 
  {
      this.user = localStorage.getItem("user");
      // Instantiates the pages object
      this.pageService.getPages().subscribe(pages => 
      {
          this.pageService.pagesBS.next(pages);
          this.pages = this.pageService.pagesBS;
          // console.log(pages);
          
      });
      // console.log(this.pageService.user);
    }
    
}
