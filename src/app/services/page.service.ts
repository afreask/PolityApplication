import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  // An observable that is used to auto update every component that uses pages
  public pagesBS = new BehaviorSubject<Object>(1);

  getPages()
  {
      return this.http.get('https://localhost:44394/pages');
  }

  getPage(pageID: string)
  {
      return this.http.get(`https://localhost:44394/pages/` + pageID);
  }

  postAddPage(value: any)
  {
      console.log(value)
      return this.http.post(`https://localhost:44394/pages/addCandidate`, value);
  }
}
