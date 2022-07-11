import {
  Component,
  createPlatform,
  OnInit,
  ɵɵsetComponentScope,
} from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { __values } from 'tslib';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-add-page',
  templateUrl: './user-add-page.component.html',
  styleUrls: ['./user-add-page.component.css'],
})
export class UserAddPageComponent implements OnInit {
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
    private router: Router,
    private pageService: PageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.loginCheck();
    this.user = JSON.parse(localStorage.getItem('user'));

    this.pageService.getPolicies().subscribe((res) => {
      // console.log(res);
      this.categories = res;
    });

    this.pageService.getURLs().subscribe((res) => {
      this.urlList = res;
    });

    this.pages = this.user.pageList;
    if (Object.keys(this.pages).length > 0) {
      // console.log('It went into the if');
      // console.log(pages[Object.keys(pages).length-1])
      this.page = this.pages[Object.keys(this.pages).length - 1];
      console.log(this.page);
    }
    // this.pageService.getPages(this.user.userID).subscribe((pages) => {
    //   this.pageService.pagesBS.next(pages);
    //   // console.log(pages);

    //   // console.log(Object.keys(value).length)
    // });
  }

  addCandidate({ form, value }: any): void {
    form.reset();
    // console.log(value);
    if (value.email != null && value.email.trim() != '') {
      value['emailList'] = [{ emailAddress: value.email }];
      delete value['email'];
    }
    // console.log(this.user)
    this.pageService.postAddPage(value, this.user.userID).subscribe((res) => {
      this.pageService.getPages(this.user.userID).subscribe((pages) => {
        this.pageService.pagesBS.next(pages);
      });
      this.page = res;
      console.log(res);
      this.user.pageList.push(this.page);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.success = true;
      window.location.reload();
    });
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

    this.pageService
      .postAddPageLinks(this.page, this.user.userID)
      .subscribe((res) => {
        console.log(res);
        this.success = res;
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

    // if (this.platformImage != null) {
    //   this.pageService.postImage(this.platformImage).subscribe((res) => {
    //     console.log(res);
    //     this.success = true;
    //     this.successMsg = res.toString();
    //   });
    // }
    console.log(this.page);
    this.page.candidate['cardList'].push({
      policyID: value.policyID,
      cardTitle: value.cardTitle,
      cardDetails: value.cardDetails,
      learnMore: value.learnMore,
    });
    this.pageService
      .postAddPolicyCard(this.page, this.user.userID)
      .subscribe((res) => {
        console.log(res);
        this.success = res;
      });
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

    this.page.candidate['kpList'].push({
      kpID: 0,
      ideaTitle: this.ideaTitle,
      platformDescription: this.platformDescription,
    });

    this.pageService
      .postAddCandidatePlatforms(this.page, this.user.userID)
      .subscribe((res) => {
        console.log(res);
        this.page.kpList = res;
      });
  }

  addImage({ form, value }: any, num: number): void {
    var tmpPage = { pageID: this.page.pageID, urlList: [] };
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
          tmpPage['urlList'].push({
            urlID: 10,
            urlName: 'profilePicture',
            link: res,
          });
          // this.page['urlList'] = [];
          console.log(tmpPage);
          this.pageService
            .postAddPageLinks(tmpPage, this.user.userID)
            .subscribe((res) => {
              console.log(res);
              this.success = res;
            });
        });
      }
    }
  }
}
