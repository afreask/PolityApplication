import { Component, OnInit } from '@angular/core';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  private param: any;
  // public candidateName: string;
  public pageBody: any;
  public urlList: any;
  public categories: any;
  public safeVideoUrl: any = '';
  public safeProfilePicture: any = '';
  public safePlatformImage: any = '';
  user: any;
  // public sanitizer: DomSanitizer;

  // The DomSanitizer needs to be done here
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private pageService: PageService,
    private sanitizer: DomSanitizer
  ) 
  {
    this.user = localStorage.getItem("user");
    this.route.params.subscribe((params) => {
      this.param = params['page'];
      if (this.param === undefined) {
        this.param = '';
        this.title.setTitle('Polity');
      }
      console.log(this.param);
      this.pageService.getPage(this.param).subscribe((page) => {
        if (page === 'PageNotFound') {
          this.router.navigateByUrl('');
        }
        // console.log(page);
        console.log(page);
        // this.candidateName = page["candidate"]
        this.pageBody = page;
        // console.log(this.pageBody);
        if (page['urlList'].length > 0) {
          this.urlList = page['urlList'];
          if (this.categories) {
          }
          for (var y in page['urlList']) {
            // console.log();
            if (page['urlList'][y]['urlName'] == 'Youtube') {
              this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                page['urlList'][y]['link']
              );
              // console.log(page['urlList'][y]['link']);
            }
            if (page['urlList'][y]['urlName'] == 'Profile Picture') {
              this.safeProfilePicture =
                this.sanitizer.bypassSecurityTrustResourceUrl(
                  page['urlList'][y]['link']
                );
            }
            if (page['urlList'][y]['urlName'] == 'Key Platform Image') {
              this.safePlatformImage =
                this.sanitizer.bypassSecurityTrustResourceUrl(
                  page['urlList'][y]['link']
                );
            }
          }
        }
        // console.log(this.pageBody.candidate.cardList);
      });
    });
    // console.log(this.safeVideoUrl);
    // this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'https://www.youtube.com/embed/mPZkdNFkNps'
    // );
  }

  ngOnInit() {
    this.pageService.getPolicies().subscribe((res) => {
      // console.log(res);
      this.categories = res;
    });
    // Check if the url parameter exists
    // if not return home
  }
}
