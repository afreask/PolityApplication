import {
  Component,
  createPlatform,
  OnInit,
  ɵɵsetComponentScope,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css'],
})
export class UserEditPageComponent implements OnInit {
  public categories: any;
  public urlList: any;
  public kpList: any;
  success: boolean = false;
  successMsg: string = '';
  errorMsg: boolean = false;
  firstName: string = '';
  lastName: string = '';
  bio: string = '';
  facebook: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
  donate: string;
  lawnSign: string;
  volunteer: string;
  email: string;
  page: any;
  profilePicture: File = null;
  platformImage: File = null;
  ideaTitle: string = '';
  ideaTitle1: string = '';
  ideaTitle2: string = '';
  ideaTitle3: string = '';
  cardTitle: string = '';
  cardDetails: string = '';
  youtube: string;
  platformDescription: string = '';
  platformDescription1: string = '';
  platformDescription2: string = '';
  platformDescription3: string = '';
  policyID: any = 1;
  user: any;
  learnMore: string;
  pages: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private userService: UserService
  ) {}

  ngOnInit(): void 
  {
    this.userService.loginCheck();
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)

    // Gets the page using the page ID 
    this.route.params.subscribe((params) => 
    {
      for (var i in this.user.pageList) 
      {
          if(this.user.pageList[i].pageID == params["page"])
          {
              this.page = this.user.pageList[i];
          }
      }
    });

    this.pageService.getPolicies().subscribe((res) => 
    {
      this.categories = res;
    });

    this.pageService.getURLs().subscribe((res) => 
    {
      this.urlList = res;
    });

    this.firstName = this.page.candidate.firstName;
    this.lastName = this.page.candidate.lastName;
    this.bio = this.page.candidate.bio;
    this.email  = this.page.candidate.email;
  }

  updateFirstName({ form, value }: any): void 
  {

    // form.reset();
    console.log(this.firstName);

    // this.pageService.postUpdateCandidateFirstName(value).subscribe((res) => {
    //   this.pageService.getPages(this.user.userID).subscribe((pages) => {
    //     this.pageService.pagesBS.next(pages);
    //   });
    //   this.page = res;
    //   this.success = true;
    // });
  }

  updateCandidateLastName({ form, value }: any): void {
    form.reset();
    // console.log(value);

    this.pageService.postUpdateFirstName(value).subscribe((res) => {
      this.pageService.getPages(this.user.userID).subscribe((pages) => {
        this.pageService.pagesBS.next(pages);
      });
      this.page = res;
      this.success = true;
    });
  }

  updateBio({ form, value }: any): void 
  {

    // form.reset();
    console.log(value);

    // this.pageService.postUpdateCandidateFirstName(value).subscribe((res) => {
    //   this.pageService.getPages(this.user.userID).subscribe((pages) => {
    //     this.pageService.pagesBS.next(pages);
    //   });
    //   this.page = res;
    //   this.success = true;
    // });
  }

  addURL({ form, value }: any) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const temp = value;
    // console.log(value);
    this.page['urlList'] = [];
    for (var i in value) {
      var urlID = 0;
      for (var o in this.urlList) {
        if (this.urlList[o].urlName.toLowerCase() == i.toString()) {
          urlID = this.urlList[o].urlID;
          break;
        }
      }
      this.page['urlList'].push({ urlID: urlID, urlName: i, link: temp[i] });
    }

    this.pageService.postAddPageLinks(this.page).subscribe((res) => {
      console.log(res);
      console.log(this.page);
    });
  }

  //Gets the file from the file input
  getFile(e: Event, num: any) {
    // const result = (e.target as HTMLInputElement).files
    // console.log((e.target as HTMLInputElement).files[0])
    const result = (e.target as HTMLInputElement).files;

    if (result != null) {
      if (num === 1) {
        this.profilePicture = <File>(e.target as HTMLInputElement).files[0];
      } else if (num === 2) {
        this.platformImage = <File>(e.target as HTMLInputElement).files[0];
      }
    }
  }

  addPolicyCard({ form, value }: any): void {
    form.reset();
    console.log(value);

    if (this.platformImage != null) {
      this.pageService.postImage(this.platformImage).subscribe((res) => {
        console.log(res);
        this.success = true;
        this.successMsg = res.toString();
      });
    }
    this.page.candidate['cardList'].push({
      policyID: 0,
      cardTitle: value.ideaTitle,
      platformDescription: value.platformDescription,
    });
    console.log(this.page);
  }

  addKeyPlatforms({ form, value }: any, num: number): void {
    form.reset();
    console.log(value);
    const temp = value;
    this.page.candidate['kpList'] = [];
    if (num === 1) {
      this.ideaTitle = value.ideaTitle1;
      this.platformDescription = value.platformDescription1;
    } else if (num === 2) {
      this.ideaTitle = value.ideaTitle2;
      this.platformDescription = value.platformDescription2;
    } else if (num === 3) {
      this.ideaTitle = value.ideaTitle3;
      this.platformDescription = value.platformDescription3;
    }
    console.log(this.ideaTitle);
    this.page.candidate['kpList'].push({
      kpID: 0,
      ideaTitle: value.ideaTitle,
      platformDescription: value.platformDescription,
    });
    // this.pageService.postAddCandidatePlatforms(this.page).subscribe((res) => {
    //   console.log(res);
    //   console.log(this.page);
    // });
  }

  addImage({ form, value }: any, num: number): void {
    if (num > 0) {
      if (num === 1 && this.profilePicture != null) {
        console.log(this.profilePicture);
        this.pageService.postImage(this.profilePicture).subscribe((res) => {
          console.log(res);
          this.success = true;
          this.successMsg = res.toString();
        });
      } else if (num === 2 && this.platformImage != null) {
        console.log(this.platformImage);
        this.pageService.postImage(this.platformImage).subscribe((res) => {
          console.log(res);
          this.success = true;
          this.successMsg = res.toString();
        });
      }
    }
  }
}
