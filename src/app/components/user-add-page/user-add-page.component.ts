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
import { bindNodeCallback } from 'rxjs';

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
  youtube: string = '';
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

    this.pages = this.user.pageList;
    if (Object.keys(this.pages).length > 0) {
      // console.log('It went into the if');
      // console.log(pages[Object.keys(pages).length-1])
      this.page = this.pages[Object.keys(this.pages).length - 1];
      console.log(this.page);
      this.firstName = this.page.candidate.firstName;
      this.lastName = this.page.candidate.lastName;
      this.bio = this.page.candidate.bio;
      if (this.page.candidate.emailList[0] > 0) {
        this.email = this.page.candidate.emailList[0];
      } else {
        this.email = this.firstName + '.' + this.lastName + '@polity.vote';
      }

      if (this.page.urlList.length > 0) {
        for (var i = 0; i < this.page.urlList.length; i++) {
          switch (this.page.urlList[i].urlName) {
            case 'Facebook':
              this.facebook = this.page.urlList[i].link;
              console.log(this.facebook);
              break;
            case 'LinkedIn':
              this.linkedIn = this.page.urlList[i].link;
              console.log(this.linkedIn);
              break;
            case 'Donate':
              this.donate = this.page.urlList[i].link;
              console.log(this.donate);
              break;
            case 'Instagram':
              this.instagram = this.page.urlList[i].link;
              console.log(this.instagram);
              break;
            case 'Key Platform Image':
              this.platformImage = this.page.urlList[i].link;
              console.log(this.platformImage);
              break;
            case 'Lawn Sign':
              this.lawnSign = this.page.urlList[i].link;
              console.log(this.lawnSign);
              break;
            case 'Profile Picture':
              this.profilePicture = this.page.urlList[i].link;
              console.log(this.profilePicture);
              break;
            case 'Twitter':
              this.twitter = this.page.urlList[i].link;
              console.log(this.twitter);
              break;
            case 'Volunteer':
              this.volunteer = this.page.urlList[i].link;
              console.log(this.volunteer);
              break;
            case 'Youtube':
              this.youtube = this.page.urlList[i].link;
              console.log(this.youtube);
              break;
          }
        }
      }
    }

    this.pageService.getPolicies().subscribe((res) => {
      // console.log(res);
      this.categories = res;
    });

    this.pageService.getURLs().subscribe((res) => {
      this.urlList = res;
      // console.log(this.urlList);
    });
  }

  addCandidate({ form, value }: any): void {
    // console.log(value);
    if (value.email != null && value.email.trim() != '') {
      value['emailList'] = [{ emailAddress: value.email }];
      delete value['email'];
    }
    console.log(this.email);
    // console.log(this.user)
    // this.pageService.postAddPage(value, this.user.userID).subscribe((res) => {
    //   this.pageService.getPages(this.user.userID).subscribe((pages) => {
    //     this.pageService.pagesBS.next(pages);
    //   });
    //   this.page = res;
    //   console.log(res);
    //   this.user.pageList.push(this.page);
    //   localStorage.setItem('user', JSON.stringify(this.user));
    //   this.success = true;
    //   window.location.reload();
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
          tmpPage['urlList'].push({
            urlID: 9,
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
      } else if (num === 2 && this.platformImage != null) {
        console.log(this.platformImage);
        this.pageService.postImage(this.platformImage).subscribe((res) => {
          console.log(res);
          this.success = true;
          this.successMsg = res.toString();
          tmpPage['urlList'].push({
            urlID: 10,
            urlName: 'platformImage',
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
