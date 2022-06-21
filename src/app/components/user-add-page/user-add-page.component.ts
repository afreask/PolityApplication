import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component(
{
  selector: 'app-user-add-page',
  templateUrl: './user-add-page.component.html',
  styleUrls: ['./user-add-page.component.css']
})
export class UserAddPageComponent implements OnInit 
{

    successMsg: boolean = false;
    errorMsg: boolean = false;
    firstName: string = "";
    lastName: string = "";
    bio: string = "";
    facebook: string = "";
    
    constructor
    (
        private router: Router,
        private pageService: PageService
    ) { }

    ngOnInit(): void {
    }

    addCandidate({form, value}:any): void
    {
        form.reset();
        // console.log(value)
        this.pageService.postAddPage(value).subscribe(res =>
        {
            console.log(res);

            this.pageService.getPages().subscribe(pages=>
            {
                this.pageService.pagesBS.next(pages);
            })
        })
    }

    
    addURL({form, value}:any)
    {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        console.log(value);
    }
}
