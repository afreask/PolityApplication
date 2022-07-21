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
  firstname: string = '';
  lastname: string = '';
  bio: string = '';
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  donate: string;
  lawnsign: string;
  volunteer: string;
  email: string;
  page: any;
  profilepicture: File = null;
  keyplatformimage: File = null;
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
  tmp: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.loginCheck();
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);

    // Gets the page using the page ID
    this.route.params.subscribe((params) => {
      for (var i in this.user.pageList) {
        if (this.user.pageList[i].pageID == params['page']) {
          this.page = this.user.pageList[i];
        }
      }
    });

    this.pageService.getPolicies().subscribe((res) => {
      this.categories = res;
    });

    this.pageService.getURLs().subscribe((res) => {
      this.urlList = res;
    });

    this.firstname = this.page.candidate.firstName;
    this.lastname = this.page.candidate.lastName;
    this.bio = this.page.candidate.bio;

    if (
      this.page.candidate.emailList.length > 0 &&
      this.page.candidate.emailList[0].emailAddress != null &&
      this.page.candidate.emailList[0].emailAddress.trim() != ''
    ) {
      this.email = this.page.candidate.emailList[0].emailAddress;
    } else {
      this.email = this.firstname + '.' + this.lastname + '@polity.vote';
    }

    if (this.page.urlList.length > 0) {
      for (var i = 0; i < this.page.urlList.length; i++) {
        this[this.page.urlList[i].urlName.replace(/ /g, '').toLowerCase()] =
          this.page.urlList[i].link;
      }
    }
  }

  updateFirstName({ form, value }: any): void {
    // form.reset();
    console.log(this.firstname);

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

  updateBio({ form, value }: any): void {
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

  updateCandidateEmail({ form, value }: any): void {
    console.log(this.email);
  }

  updateURL({ form, value }: any, id: any): void {
    console.log(value);
    console.log(id);
  }

  updatePolicyCard({ form, value }: any, id: any): void {
    console.log(value);
    console.log(id);
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
        this.profilepicture = <File>(e.target as HTMLInputElement).files[0];
      } else if (num === 2) {
        this.keyplatformimage = <File>(e.target as HTMLInputElement).files[0];
      }
    }
  }

  addPolicyCard({ form, value }: any): void {
    form.reset();
    console.log(value);

    if (this.keyplatformimage != null) {
      this.pageService.postImage(this.keyplatformimage).subscribe((res) => {
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
      if (num === 1 && this.profilepicture != null) {
        console.log(this.profilepicture);
        this.pageService.postImage(this.profilepicture).subscribe((res) => {
          console.log(res);
          this.success = true;
          this.successMsg = res.toString();
        });
      } else if (num === 2 && this.keyplatformimage != null) {
        console.log(this.keyplatformimage);
        this.pageService.postImage(this.keyplatformimage).subscribe((res) => {
          console.log(res);
          this.success = true;
          this.successMsg = res.toString();
        });
      }
    }
  }
}
