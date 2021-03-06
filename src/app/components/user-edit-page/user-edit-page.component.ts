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
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css'],
})
export class UserEditPageComponent implements OnInit {
  public categories: any;
  public urlList: any;
  public kpList: any;
  public cardTitleList: any = [];
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
  slideshare: string;
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
  policycardform: any;
  PolicyCardStyle: any;
  public styleList: any;
  cardFilterID: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private userService: UserService,
    private fb: FormBuilder
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
      // console.log(this.urlList);
    });

    this.pageService.getPolicyCardStyles().subscribe((styles) => {
      this.styleList = styles;
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

    if (this.page.candidate.kpList.length > 0) {
      this.ideaTitle1 = this.page.candidate.kpList[0].ideaTitle;
      this.platformDescription1 =
        this.page.candidate.kpList[0].platformDescription;
    }
    if (this.page.candidate.kpList.length > 1) {
      this.ideaTitle2 = this.page.candidate.kpList[1].ideaTitle;
      this.platformDescription2 =
        this.page.candidate.kpList[1].platformDescription;
    }
    if (this.page.candidate.kpList.length > 2) {
      this.ideaTitle3 = this.page.candidate.kpList[2].ideaTitle;
      this.platformDescription3 =
        this.page.candidate.kpList[2].platformDescription;
    }

    this.policycardform = this.fb.group({
      policycards: this.fb.array([]),
    });

    var pcl = this.page.candidate.cardList; //Policy Card List
    // console.log(pcl);
    for (var x = 0; x < pcl.length; x++) {
      // console.log(this.page.candidate.cardList[x]);
      const cardList = this.policycardform.controls.policycards as FormArray;
      // console.log(cardList);
      cardList.push(
        this.fb.group({
          cardID: pcl[x].cardID,
          cardTitle: pcl[x].cardTitle,
          category: '',
          learnMore: pcl[x].learnMore,
          cardDetails: pcl[x].cardDetails,
          policyID: pcl[x].policyID,
        })
      );
    }
    for (var x = 0; x < this.page.candidate.cardList.length; x++) {
      console.log(this.page.candidate.cardList[x].cardTitle);
      this.cardTitleList.push({
        policyID: this.page.candidate.cardList[x].policyID,
        cardTitle: this.page.candidate.cardList[x].cardTitle,
      });
    }
  }

  get PolicyCards() {
    return this.policycardform.controls.policycards as FormArray;
  }

  PushPolicyCard() {
    const cardList = this.policycardform.controls.policycards as FormArray;
    console.log(cardList);
    cardList.push(
      this.fb.group({
        cardID: 0,
        cardTitle: '',
        category: '',
        learnMore: '',
        cardDetails: '',
        policyID: '',
      })
    );
  }

  textInputer(e: Event, index: number, attr: string) {
    this.policycardform.get('policycards').value[index][attr] = (
      e.target as HTMLInputElement
    ).value;
    // console.log(this.policycardform.get('policycards').value);
  }

  updateCandidateFirstName({ form, value }: any): void {
    if (this.firstname != null && this.firstname.trim() != '') {
      this.pageService
        .postUpdateCandidateFirstName(
          this.firstname,
          this.user.userID,
          this.page.candidate.id
        )
        .subscribe((res) => {
          // this.pageService.getPages(this.user.userID).subscribe((pages) => {
          //   this.pageService.pagesBS.next(pages);
          // });
          // this.page = res;
          if (res == 1) {
            this.page.candidate.firstName = this.firstname;
            for (var i in this.user.pageList) {
              if (this.user.pageList[i].pageID == this.page.pageID) {
                this.user.pageList[i] = this.page;
              }
            }
            // this.user.page.candidate.firstName = this.firstname;
            localStorage.getItem['user'] = JSON.stringify(this.user);
            this.success = true;
          }
        });
    } else {
      alert("Candidate's first name cannot be blank");
    }
  }

  updateCandidateLastName({ form, value }: any): void {
    if (this.lastname != null && this.lastname.trim() != '') {
      this.pageService
        .postUpdateCandidateLastName(
          this.lastname,
          this.user.userID,
          this.page.candidate.id
        )
        .subscribe((res) => {
          if (res == 1) {
            this.page.candidate.lastName = this.lastname;
            for (var i in this.user.pageList) {
              if (this.user.pageList[i].pageID == this.page.pageID) {
                this.user.pageList[i] = this.page;
              }
            }
            // this.user.page.candidate.firstName = this.firstname;
            localStorage.getItem['user'] = JSON.stringify(this.user);
            this.success = true;
            alert('Last name successfully changed.');
          }
        });
    } else {
      alert("Candidate's last name cannot be blank");
    }
  }

  updateCandidateBio({ form, value }: any): void {
    this.pageService
      .postUpdateCandidateBio(
        this.bio,
        this.user.userID,
        this.page.candidate.id
      )
      .subscribe((res) => {
        if (res == 1) {
          this.page.candidate.bio = this.bio;
          for (var i in this.user.pageList) {
            if (this.user.pageList[i].pageID == this.page.pageID) {
              this.user.pageList[i] = this.page;
            }
          }
          // this.user.page.candidate.firstName = this.firstname;
          localStorage.getItem['user'] = JSON.stringify(this.user);
          this.success = true;
          alert("Candidate's bio has successfully been changed.");
        }
      });
  }

  updateCandidateEmail({ form, value }: any): void {
    console.log(this.email);
  }

  updatePageURL({ form, value }: any, id: any): void {
    // console.log(value);
    var puID = 0;
    for (var x = 0; x < this.page.urlList.length; x++) {
      if (this.page.urlList[x].urlID == id) {
        puID = this.page.urlList[x].pageURLID;
        // console.log(
        //   this[this.page.urlList[x].urlName.toLowerCase().replaceAll(' ', '')]
        // );
      }
    }

    for (var i in value) {
      var url = { pageURLID: puID, urlID: id, urlName: i, link: this[i] };
      // console.log(this.page.pageID)
      this.pageService
        .postUpdatePageURL(url, this.user.userID, this.page.pageID)
        .subscribe((res) => {
          // console.log(res);
          if (res > 0) {
            alert('URL has successfully been changed.');
            this.pageService
              .postGetPageLinks(this.page.pageID)
              .subscribe((links) => {
                this.page.urlList = links;
                for (var p in this.user.pageList) {
                  if (this.page.pageID == this.user.pageList[p].pageID) {
                    this.user.pageList[p] = this.page;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                    //   this.router.navigate([this.router.url]);
                    // });
                    this.ngOnInit();
                  }
                }
              });
          } else {
            alert(
              'URL has not been changed. Please check your link and try again.'
            );
          }
        });
    }
  }

  UpdateKeyPlatform({ form, value }: any, num: any): void {
    var tmpKPID = this.page.candidate.kpList[num - 1].platformID;

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
    // console.log(this.ideaTitle);
    var toSend = {
      platformID: tmpKPID,
      ideaTitle: this.ideaTitle,
      platformDescription: this.platformDescription,
    };

    this.pageService
      .postUpdateKeyPlaform(toSend, this.user.userID)
      .subscribe((res) => {
        if (res == 1) {
          this.page.candidate.kpList[num - 1] = toSend;
          alert('The platform has been updated.');
          for (var p in this.user.pageList) {
            if (this.page.pageID == this.user.pageList[p].pageID) {
              this.user.pageList[p] = this.page;
              localStorage.setItem('user', JSON.stringify(this.user));
              this.ngOnInit();
            }
          }
        } else {
          alert(
            'The platform update was unsuccessful please check your inputs and try again.'
          );
        }
      });
  }

  // updatePolicyCard(index: number): void {
  //   // console.log(value);
  //   // console.log(index);
  //   // console.log(this.PolicyCards.controls[index].value);
  //   var pc = this.PolicyCards.controls[index].value;
  //   // console.log(this.PolicyCards.controls[index].value);
  //   this.pageService
  //     .postUpdatePolicyCard(
  //       pc,
  //       this.user.userID,
  //       this.page.candidate.candidateID
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.page.candidate.cardList =
  //         this.policycardform.get('policycards').value;
  //     });
  // }

  updatePolicyCard({ form, value }: any): void {
    // console.log(value);
    // console.log(index);
    // console.log(this.PolicyCards.controls[index].value);
    // var pc = this.PolicyCards.controls[index].value;
    // console.log(this.PolicyCards.controls[index].value);
    this.pageService
      .postUpdatePolicyCard(
        // pc,
        this.user.userID,
        this.page.candidate.candidateID
      )
      .subscribe((res) => {
        console.log(res);
        this.page.candidate.cardList =
          this.policycardform.get('policycards').value;
      });
  }

  // updateURL(value: any, id: any)
  // {
  //     // console.log(value);
  //     var puID = 0;
  //     for(var x = 0; x < this.page.urlList.length; x ++)
  //     {
  //         if(this.page.urlList[x].urlID == id)
  //         {
  //           puID = this.page.urlList[x].pageURLID;
  //         }
  //     }

  //     for(var i in value)
  //     {
  //       var url = {pageURLID: puID, urlID: id, urlName: i, link: this[i]}
  //       // console.log(this.page.pageID)
  //       console.log(url);
  //       this.pageService.postUpdatePageURL(url, this.user.userID, this.page.pageID).subscribe((res) =>
  //       {
  //         // console.log(res);
  //         if(res > 0)
  //         {
  //           alert("URL has successfully been changed.");
  //           this.pageService.postGetPageLinks(this.page.pageID).subscribe((links)=>
  //           {
  //               this.page.urlList = links;
  //               for(var p in this.user.pageList)
  //               {
  //                   if(this.page.pageID == this.user.pageList[p].pageID)
  //                   {
  //                       this.user.pageList[p] = this.page;
  //                       localStorage.setItem('user', JSON.stringify(this.user));
  //                       // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  //                       //   this.router.navigate([this.router.url]);
  //                       // });
  //                       this.ngOnInit();
  //                   }
  //               }
  //           });
  //         }
  //         else
  //         {
  //             alert("URL has not been changed. Please check your link and try again.");
  //         }
  //       });
  //     }
  // }

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

  updateImage({ form, value }: any, num: number): void {
    if (num > 0) {
      if (num === 1 && this.profilepicture != null) {
        this.pageService.postImage(this.profilepicture).subscribe((res) => {
          this.success = true;
          this.successMsg = res.toString();
          var puID = 0;
          var puID = 0;
          for (var x = 0; x < this.page.urlList.length; x++) {
            if (this.page.urlList[x].urlName == 'Profile Picture') {
              puID = this.page.urlList[x].pageURLID;
            }
          }

          var url = {
            pageURLID: puID,
            urlID: 9,
            urlName: 'profilePicture',
            link: res,
          };

          this.pageService
            .postUpdatePageURL(url, this.user.userID, this.page.pageID)
            .subscribe((res) => {
              if (res > 0) {
                alert('Image has successfully been updated.');
                this.pageService
                  .postGetPageLinks(this.page.pageID)
                  .subscribe((links) => {
                    this.page.urlList = links;
                    for (var p in this.user.pageList) {
                      if (this.page.pageID == this.user.pageList[p].pageID) {
                        this.user.pageList[p] = this.page;
                        localStorage.setItem('user', JSON.stringify(this.user));
                        // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                        //   this.router.navigate([this.router.url]);
                        // });
                        this.ngOnInit();
                      }
                    }
                  });
              } else {
                alert(
                  'URL has not been changed. Please check your link and try again.'
                );
              }
            });
        });
      } else if (num === 2 && this.keyplatformimage != null) {
        // console.log(this.keyplatformimage);
        this.pageService.postImage(this.keyplatformimage).subscribe((res) => {
          // console.log(res);
          // console.log(this.page.urlList);
          var puID = 0;
          for (var x = 0; x < this.page.urlList.length; x++) {
            if (this.page.urlList[x].urlName == 'Key Platform Image') {
              puID = this.page.urlList[x].pageURLID;
            }
          }

          var url = {
            pageURLID: puID,
            urlID: 10,
            urlName: 'platformImage',
            link: res,
          };

          this.pageService
            .postUpdatePageURL(url, this.user.userID, this.page.pageID)
            .subscribe((res) => {
              if (res > 0) {
                alert('Image has successfully been updated.');
                this.pageService
                  .postGetPageLinks(this.page.pageID)
                  .subscribe((links) => {
                    this.page.urlList = links;
                    for (var p in this.user.pageList) {
                      if (this.page.pageID == this.user.pageList[p].pageID) {
                        this.user.pageList[p] = this.page;
                        localStorage.setItem('user', JSON.stringify(this.user));
                        // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                        //   this.router.navigate([this.router.url]);
                        // });
                        this.ngOnInit();
                      }
                    }
                  });
              } else {
                alert(
                  'URL has not been changed. Please check your link and try again.'
                );
              }
            });

          // this.success = true;
          // this.successMsg = res.toString();
        });
      }
    }
  }

  deleteUrl(pageURLID) {
    console.log(pageURLID);
  }

  test() {
    console.log(this.policyID);

    console.log(this.styleList);
  }
}
