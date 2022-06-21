import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

    pages: any;
    successMsg: boolean = false;
    constructor
    (
        private router: Router,
        private pageService: PageService
    ) { }

    ngOnInit(): void 
    {
        this.pages = this.pageService.pagesBS;
    }

}
