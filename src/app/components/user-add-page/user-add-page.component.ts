import { Component, createPlatform, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { __values } from 'tslib';

@Component(
{
  selector: 'app-user-add-page',
  templateUrl: './user-add-page.component.html',
  styleUrls: ['./user-add-page.component.css']
})
export class UserAddPageComponent implements OnInit 
{
    public categories: any;
    public urlList: any;
    success: boolean = false;
    successMsg: string = "";
    errorMsg: boolean = false;
    firstName: string = "";
    lastName: string = "";
    bio: string = "";
    facebook: string ;
    instagram: string;
    linkedIn: string ;
    twitter: string ;
    donate: string ;
    lawnSign: string ;
    volunteer: string;
    email: string ;
    page: any;
    profilePicture: File = null;
    platformImage: File = null;
    ideaTitle: string = "";
    cardTitle: string = "";
    cardDetails: string = "";
    youtube: string;
    platformDescription: string = "";
    policyID: any;

    constructor
    (
        private router: Router,
        private pageService: PageService,
    ) { }

    ngOnInit(): void 
    {
        this.pageService.getPolicies().subscribe(res=>
        {
            this.categories = res;
        })

        this.pageService.getURLs().subscribe(res=>
        {
            this.urlList = res;
        })
        this.pageService.getPages().subscribe(pages=>
        {
            this.pageService.pagesBS.next(pages);
            if(Object.keys(pages).length > 0)
            {
                // console.log("It went into the if")
                // console.log(pages[Object.keys(pages).length-1])
                this.page = pages[Object.keys(pages).length-1]
            }
            // console.log(Object.keys(value).length)
            // console.log(this.page);
        })
    }

    addCandidate({form, value}:any): void
    {
        form.reset();
        if (value.email != null)
        {
            value['emailList'] = [{'emailAddress' : value.email}];
            delete value['email'];
        }

        this.pageService.postImage(this.profilePicture).subscribe(res=>
        {
            console.log(res);
            this.success = true;
            this.successMsg = res.toString()
        })

        this.pageService.postAddPage(value).subscribe(res =>
        {       
            this.pageService.getPages().subscribe(pages=>
            {
                this.pageService.pagesBS.next(pages);
            })
            this.page = res;
            this.success = true
          })
    }

    
    addURL({form, value}:any)
    {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        const temp = value
        this.page["urlList"] = [];
        for(var i in value)
        {
          var urlID = 0;
          for(var o in this.urlList)
          {
              if (this.urlList[o].urlName.toLowerCase()  == i.toString())
              {
                  urlID = this.urlList[o].urlID
                  break;
              }  

          }
          this.page["urlList"].push({"urlID": urlID,"urlName": i, "link":temp [i]});
        }
         
        this.pageService.postAddPageLinks(this.page).subscribe(res =>
        {
            console.log(res);
            console.log(this.page)
        })
    }

    //Gets the file from the file input
    getFile(e: Event, num: any)
    {
        // const result = (e.target as HTMLInputElement).files
        // console.log((e.target as HTMLInputElement).files[0])
        const result = (e.target as HTMLInputElement).files
        
        if(result != null)
        {
          if(num === 1)
          {
              this.profilePicture = <File> (e.target as HTMLInputElement).files[0];
          }
          else if (num === 2)
          {
              this.platformImage = <File> (e.target as HTMLInputElement).files[0];
          }
        }
    }

    addPolicyCard({form, value}:any): void
    {
        console.log(value);
    }

    addKeyPlatforms({form, value}:any): void
    {
        console.log(value)
    }
}
