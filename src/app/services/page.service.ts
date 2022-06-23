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
    
    // public user = this.getUser();
    
    // getUser()
    // {
    //     return this.http.get(`https://localhost:44394/`);
    // }

    getPages()
    {
        return this.http.get('https://localhost:44394/pages');
    }

    getPage(pageID: string)
    {
        return this.http.get(`https://localhost:44394/pages/` + pageID);
    }

    getPolicies()
    {
        return this.http.get(`https://localhost:44394/pages/Policies`)
    }

    getURLs()
    {
        return this.http.get(`https://localhost:44394/pages/URLs`)
    }

    postAddPage(value: any)
    {
        // console.log(value)
        return this.http.post(`https://localhost:44394/pages/AddCandidate`, value);
    }

    postAddPageLinks(value: any)
    {
        // console.log(value)
        return this.http.post(`https://localhost:44394/pages/AddPageLinks`, value);
    }

    postImage(file: File)
    {
        const fd = new FormData();
        fd.append('image', file, file.name);
        console.log(fd.has("image"))

        return this.http.post(`https://localhost:44394/pages/UploadImage`, fd);
    }
}
