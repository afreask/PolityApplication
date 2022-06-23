import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    private param: any;
    // public candidateName: string;
    public pageBody: any;
    public urlList: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private pageService: PageService
    ) {}

    ngOnInit()
    {
        // Check if the url parameter exists
        // if not return home
        this.route.params.subscribe(params => 
        {
            this.param = params["page"];
            if(this.param === undefined)
            {
                this.param = "";
                this.title.setTitle("Polity");
            }
            this.pageService.getPage(this.param).subscribe(page => 
            {
                if(page == "PageNotFound")
                {
                    this.router.navigateByUrl("");
                }
                // this.candidateName = page["candidate"]
                this.pageBody = page;
                console.log(this.pageBody)
                this.urlList = this.pageBody["urlList"]
                // console.log(this.pageBody["urlList"]);
            });
        })


    }

}
