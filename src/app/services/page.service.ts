import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private http: HttpClient) {}

  // An observable that is used to auto update every component that uses pages
  public pagesBS = new BehaviorSubject<Object>(1);

  getAllCandidates() {
    return this.http.get('https://localhost:44394/pages/GetAllCandidates');
    // return this.http.get('https://politywebapplication20220706124808.azurewebsites.net/pages/GetUserPages'+userID);
  }

  getPages(userID: number) {
    return this.http.get('https://localhost:44394/pages/GetUserPages'+userID);
    // return this.http.get('https://politywebapplication20220706124808.azurewebsites.net/pages/GetUserPages'+userID);
  }

  getPage(pageID: string) {
    return this.http.get(`https://localhost:44394/pages/` + pageID);
    // return this.http.get(`https://politywebapplication20220706124808.azurewebsites.net/pages/` + pageID);
  }

  getPolicies() {
    // return this.http.get(`https://localhost:44394/pages/Policies`);
    return this.http.get(`https://politywebapplication20220706124808.azurewebsites.net/pages/Policies`);
  }

  getURLs() {
    // return this.http.get(`https://localhost:44394/pages/URLs`);
    return this.http.get(`https://politywebapplication20220706124808.azurewebsites.net/pages/URLs`);
  }

  postAddPage(value: any, userID?: any) {
    // console.log(value)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('candidate', value)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/AddCandidate', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/AddCandidate', body, {
        headers: headers,
        params: params,
      })
  }

  postGetPageLinks(value: any) {
    // console.log(value)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('pageID', value)
    return this.http
      // .post<any>('https://localhost:44394/pages/GetPageLinks', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/GetPageLinks', body, {
        headers: headers,
        params: params,
      })
  }

  postAddPageLinks(value: any, userID?: string) {
    // console.log(value)
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('page', value)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/AddPageLinks', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/AddPageLinks', body, {
        headers: headers,
        params: params,
    })
  }

  postAddPolicyCard(value: any, userID?: string) {
    // console.log(value)
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('page', value)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/AddPolicyCard', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/AddPolicyCard', body, {
        headers: headers,
        params: params,
    })
  }

  postAddCandidatePlatforms(value: any, userID?: string) {
    // console.log(value)
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('page', value)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/AddCandidatePlatforms', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/AddCandidatePlatforms', body, {
        headers: headers,
        params: params,
    })
  }

  postImage(file: File) {
    const fd = new FormData();
    fd.append('image', file, file.name);
    // console.log(fd.has("image"))

    // return this.http.post(`https://localhost:44394/pages/UploadImage`, fd);
    return this.http.post(`https://politywebapplication20220706124808.azurewebsites.net/pages/UploadImage`, fd);
  }

  postUpdateCandidateFirstName(value: any, userID?: any, personID?: any) {
    // console.log(value)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('firstName', value)
    .append('personID', personID)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/UpdateCandidateFirstName', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/UpdateCandidateFirstName', body, {
        headers: headers,
        params: params,
      })
  }

  postUpdateCandidateLastName(value: any, userID?: any, personID?: any) {
    // console.log(value)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('lastName', value)
    .append('personID', personID)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/UpdateCandidateLastName', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/UpdateCandidateLastName', body, {
        headers: headers,
        params: params,
      })
  }

  postUpdateCandidateBio(value: any, userID?: any, candidateID?: any) {
    // console.log(value)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('bio', value)
    .append('candidateID', candidateID)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/UpdateCandidateBio', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/UpdateCandidateBio', body, {
        headers: headers,
        params: params,
      })
  }

  postUpdatePageURL(value: any, userID?: any, pageID?: any) {
    console.log(pageID)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('url', value)
    .append('pageID', pageID)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/UpdatePageLink', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/UpdatePageLink', body, {
        headers: headers,
        params: params,
      })
  }

  postUpdateKeyPlaform(value: any, userID?: any) {
    // console.log(value)
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.stringify(value);
    const params = new HttpParams()
    .append('platform', value)
    .append('userID', userID);
    return this.http
      // .post<any>('https://localhost:44394/pages/UpdateCandidatePlatform', body, {
      .post<any>('https://politywebapplication20220706124808.azurewebsites.net/pages/AddCandidate', body, {
        headers: headers,
        params: params,
      })
  }
}
