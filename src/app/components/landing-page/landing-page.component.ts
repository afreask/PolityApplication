import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  candidateList: any;

  constructor
  (
      public pageService: PageService
  ) { }

  ngOnInit(): void 
  {
      this.pageService.getAllCandidates().subscribe((res) => 
      {
          console.log(res)
          if(res != null)
          {
              this.candidateList = res;
              // console.log(this.candidateList);
          }
      });
  }

}
